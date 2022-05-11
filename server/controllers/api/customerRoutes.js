const router = require("express").Router();
const nodemailer = require("nodemailer");

// email client instance
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// modules
const {
    CustomerGuardian,
    CustomerMinor,
    CustomerGuardianHasCustomerMinor,
} = require("../../models");
const { signToken } = require("../../utils/auth");
const generateHtmlEmail = require("../../utils/emailHtml");
const generatePlainEmail = require("../../utils/emailPlain");
const Memberships = require("../../models/Memberships");

// get all users
router.get("/", async (req, res) => {
    try {
        const guardianData = await CustomerGuardian.findAll({
            include: [
                {
                    model: CustomerMinor,
                    through: {
                        model: CustomerGuardianHasCustomerMinor,
                        attributes: [],
                    },
                    as: "minors",
                },
            ],
        });
        res.json(guardianData);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get("/auto-complete", async (req, res) => {
    try {
        const guardianData = await CustomerGuardian.findAll({
            include: [
                {
                    model: CustomerMinor,
                    attributes: ["id", "minorFirstName", "minorLastName"],
                    through: {
                        attributes: [],
                    },
                    as: "minors",
                },
                {
                    model: Memberships,
                    attributes: ["title"],
                }
            ],
            attributes: ["id", "displayName", "email","photoURL"],
        });
        res.json(guardianData);
    } catch (error) {
        res.status(500).json(error);
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

module.exports = router;
