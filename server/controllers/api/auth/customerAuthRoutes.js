const router = require("express").Router();
const {
    CustomerGuardian,
    CustomerMinor,
    CustomerGuardianHasCustomerMinor,
} = require("../../../models");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const { randomUUID } = require("crypto");
const cloudinary = require("cloudinary").v2;

const generateHtmlEmail = require("../../../utils/emailHtml");
const generatePlainEmail = require("../../../utils/emailPlain");
const { signToken } = require("../../../utils/auth");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
});

// email client instance
const sgMail = require("@sendgrid/mail");
const SignedWaivers = require("../../../models/SignedWaivers");
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
        const accessToken = signToken({ id, email });

        res.json({
            existingCustomerData,
            accessToken,
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

router.post("/new", async (req, res) => {
    try {
        const newCustomerData = await CustomerGuardian.create({
            ...req.body.guardians,
            isAccountOwner: true,
            displayName: `${req.body.guardians.guardianFirstName} ${req.body.guardians.guardianLastName}`,
        });
        console.log(req.body);
        // map through minor array and add customeguardian id to each minor
        const minorsWithIdArr = req.body.minors.map((minor) => {
            return {
                ...minor,
                guardian_id: newCustomerData.id,
            };
        });
        console.log(minorsWithIdArr);
        const newCustomerMinorDataArr = await CustomerMinor.bulkCreate(
            minorsWithIdArr
        );
        // map through newCusomerMinoeDataArr and add customeguardian id to each minor create cusomterguardianhascustomerminor
        newCustomerMinorDataArr.map(async (minor) => {
            await CustomerGuardianHasCustomerMinor.create({
                guardian_id: newCustomerData.id,
                minor_id: minor.id,
            });
        });
        // const token = signToken({id: newCustomerData.id, email: newCustomerData.email});

        // test user created by mui assets api
        const accessToken = signToken({
            id: "8864c717-587d-472a-929a-8e5f298024da-0",
            displayName: "Jaydon Frankie",
            email: "demo@minimals.cc",
            password: "demo1234",
            photoURL:
                "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_default.jpg",
            phoneNumber: "+40 777666555",
            country: "United States",
            address: "90210 Broadway Blvd",
            state: "California",
            city: "San Francisco",
            zipCode: "94116",
            about: "Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.",
            role: "admin",
            isPublic: true,
        });

        res.status(200).json({
            customer: { newCustomerData, newCustomerMinorDataArr },
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.put("/save-signed-waiver/cloudinary/:id", async (req, res) => {
    const UUID = randomUUID();
    let signedWaiverURL;
    await cloudinary.uploader.upload(
        req.body.signedWaiver,
        {
            public_id: `pdfs/customer-pdfs/${UUID}`,
            overwrite: true,
        },
        function (error, result) {
            signedWaiverURL = result.url;
            console.log(result, error);
        }
    );
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
    const minorIds = customerResponse.minors.map((minor) => minor.id);
    if (minorIds.length > 0) {
        await minorIds.map((minorId) =>
            SignedWaivers.create({
                waiverURL: signedWaiverURL,
                guardian_id: req.params.id,
                minor_id: minorId,
            })
        );
    } else {
        await SignedWaivers.create({
            waiverURL: signedWaiverURL,
            guardian_id: req.params.id,
        });
    }
    console.log(signedWaiverURL);
    console.log("param id", req.params.id);
    res.status(200).json({
        message: "Signed Waiver Saved",
    });
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
