const router = require("express").Router();
const {
    CustomerGuardian,
    CustomerMinor,
    CustomerGuardianHasCustomerMinor,
} = require("../../../../server/models");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const { randomUUID } = require("crypto");
const cloudinary = require("cloudinary").v2;

const generateHtmlEmail = require("../../../utils/emailHtml");
const generatePlainEmail = require("../../../utils/emailPlain");
const { signToken } = require("../../../src/utils/auth");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
});

// email client instance
const sgMail = require("@sendgrid/mail");
const SignedWaivers = require("../../../../server/models/SignedWaivers");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// api/auth/customers

router.post("/login", async (req, res) => {
    console.log("login route");
    try {
        const existingCustomerData = await CustomerGuardian.findOne({
            where: {
                email: req.body.email,
            },
            include: [
                {
                    model: CustomerMinor,
                    through: CustomerGuardianHasCustomerMinor,
                    as: "minors",
                },
            ],
        });
        if (!existingCustomerData) {
            res.status(400).json({
                message: "Invalid User name or password",
            });
            return;
        }
        const validPassword = await existingCustomerData.checkPassword(
            req.body.password
        );

        if (!validPassword) {
            res.status(400).json({ message: "Invalid User name or password" });
            return;
        }
        const { id, email } = existingCustomerData.dataValues;
        const customerAccessToken = signToken({ id, email });

        res.json({
            existingCustomerData,
            customerAccessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// reset password routed send code to email
router.put("/reset-password", async (req, res) => {
    try {
        const randomNumReset = randomstring.generate({
            length: 6,
            charset: "alphanumeric",
            capitalization: "uppercase",
        });

        const customerGuardianData = await CustomerGuardian.update(
            {
                resetPasswordToken: randomNumReset,
                resetPasswordExpires: Date.now() + 3600000,
                resetPasswordUsed: false,
            },
            {
                where: {
                    email: req.body.email,
                },
            }
        );

        if (!customerGuardianData[0]) {
            return res.status(404).json({
                message: "Email not found",
            });
        }

        await sgMail.send({
            from: "admin@bloksy.com",
            to: req.body.email,
            subject: "Reset Password Request from Bloksy",
            text: generatePlainEmail(randomNumReset),
            html: generateHtmlEmail(randomNumReset),
        });
        // console.log("Message sent: %s", info.messageId);

        res.status(200).json({
            message: "Email sent",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});



router.post("/save-signed-waiver/cloudinary/:id", async (req, res) => {
    try {
    // generate randome UUID for signed waiver
    const UUID = randomUUID();
    let signedWaiverURL;
    // upload signed waiver to cloudinary
    await cloudinary.uploader.upload(
        req.body.signedWaiver,
        {
            public_id: `pdfs/customer-pdfs/${UUID}`,
            overwrite: true,
        },
        function (error, result) {
            // set the signed waiver url
            signedWaiverURL = result.url;
            console.log(result, error);
        }
    );
    // find the customer by id and include the minors
    const customerResponse = await CustomerGuardian.findOne({
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: CustomerMinor,
                through: CustomerGuardianHasCustomerMinor,
                as: "minors",
            },
        ],
    });
    // create a minor list to update
    const minorIds = customerResponse.minors.map((minor) => minor.id);
    // if the customer has minors create the links in the signedWaiver table
    if (minorIds.length > 0) {
        await minorIds.map((minorId) =>
            SignedWaivers.create({
                waiverURL: signedWaiverURL,
                guardian_id: req.params.id,
                minor_id: minorId,
            })
        );
    } else {
        // if the customer does not have minors create the links in the signedWaiver table
        await SignedWaivers.create({
            waiverURL: signedWaiverURL,
            guardian_id: req.params.id,
        });
    }
    await sgMail.send({
        from: "admin@bloksy.com",
        to: customerResponse.email,
        subject: "Signed Waiver from Bloksy",
        text: generatePlainEmail(signedWaiverURL),
        html: generateHtmlEmail(signedWaiverURL),
    });
    res.status(200).json({
        signedWaiverURL,
        message: "Signed Waiver Saved",
    });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.delete("/:id", (req, res) => {
    CustomerGuardian.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
