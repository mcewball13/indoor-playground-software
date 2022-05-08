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
} = require("../../../models");
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

module.exports = {
    customerLogin: async (parent, { email, password }, context) => {
        try {
            const existingCustomerData = await CustomerGuardian.findOne({
                where: {
                    email: email,
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
                throw new AuthenticationError(
                    "Incorrect credentials, Please try again"
                );
            }
            const validPassword = await existingCustomerData.checkPassword(
                password
            );

            if (!validPassword) {
                throw new AuthenticationError(
                    "Incorrect credentials, Please try again"
                );
            }
            const { id, email: customerEmail} = existingCustomerData.dataValues;
            const customerAccessToken = signToken({ id, customerEmail });

            return {
                existingCustomerData,
                customerAccessToken,
            };
        } catch (error) {
            console.log(error);
            throw new AuthenticationError(
                "Internal Seerver Error, Please try again"
            );
        }
    },
    customerRegister: async (parent, { guardians, minors = []}, context) => {
        console.log(guardians)
        try {
            const newCustomerData = await CustomerGuardian.create({
                ...guardians,
                isAccountOwner: true,
                displayName: `${guardians.guardianFirstName} ${guardians.guardianLastName}`,
            });
            console.log(guardians);
            // map through minor array and add customeguardian id to each minor
            const minorsWithIdArr = minors.map((minor) => {
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
            const customerAccessToken = signToken({
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
            
            return {
                customer: { ...newCustomerData.get({ plain: true }), minors: newCustomerMinorDataArr },
                customerAccessToken,
            };
        } catch (error) {
            console.log(error);
            throw new AuthenticationError(
                "Internal Server Error, Please try again"
            );
        }
    },
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
