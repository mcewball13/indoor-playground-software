const router = require("express").Router();
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");

// email client instance
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// modules
const {
    CustomerGuardian,
    CustomerMinor,
    CustomerGuardianHasCustomerMinor,
} = require("../../models");
const { signToken } = require("../../utils/auth");
const generateHtmlEmail = require("../../utils/emailHtml");
const generatePlainEmail = require("../../utils/emailPlain");

// get all users
router.get("/", async (req, res) => {
    try {
        const guardianData = await CustomerGuardian.findAll({});
        res.json(guardianData);
    } catch (error) {
        res.status(500).statusMessage(error);
    }
});

router.get("/:id", async (req, res) => {
    const customerGuardianData = await CustomerGuardian.findOne({
        attributes: { exclude: ["password"] },
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
    res.status(200).json(customerGuardianData);
});
// check to see if email exists on blur from email field
router.get("/email/:email", async (req, res) => {
    const customerGuardianData = await CustomerGuardian.findOne({
        attributes: { exclude: ["password"] },
        where: {
            email: req.params.email,
        },
        include: [
            {
                model: CustomerMinor,
                through: CustomerGuardianHasCustomerMinor,
                as: "minors",
            },
        ],
    });
    res.status(200).json(customerGuardianData);
});

// return true if user exits to trigger modal to show and have user login to call email loging route
router.get("/email-exists/:email/", async (req, res) => {
    try {
        const customerGuardianData = await CustomerGuardian.findOne({
            attributes: { exclude: ["password"] },
            where: {
                email: req.params.email,
            },
        });
        if (!customerGuardianData) {
            res.status(200).json({
                existingCustomer: { exists: false },
            });
        } else {
            res.status(200).json({
                existingCustomer: {
                    exists: true,
                    customerEmail: customerGuardianData.email,
                },
            });
        }
    } catch (error) {
        res.status(500).statusMessage(error);
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
            from: 'admin@bloksy.com',
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



module.exports = router;
