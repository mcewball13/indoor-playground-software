const router = require("express").Router();
const { AuthenticationError } = require("apollo-server-express");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const { randomUUID } = require("crypto");
const cloudinary = require("cloudinary").v2;

const {
    CustomerGuardian,
    CustomerMinor,
    CustomerGuardianHasCustomerMinor,
} = require("../../models");
const generateHtmlEmail = require("../../utils/emailHtml");
const generatePlainEmail = require("../../utils/emailPlain");
const { signToken } = require("../../utils/auth");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
});

// email client instance
const sgMail = require("@sendgrid/mail");
const SignedWaivers = require("../../models/SignedWaivers");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    emailExists: async (parent, { email }, context) => {
        try {
            const customerGuardianData = await CustomerGuardian.findOne({
                attributes: { exclude: ["password"] },
                where: {
                    email: email,
                },
            });
            if (!customerGuardianData) {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            throw new AuthenticationError(
                "Internal Server Error, Please try again"
            );
        }
    }
};
