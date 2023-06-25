const { AuthenticationError } = require('apollo-server-micro');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const { randomUUID } = require('crypto');
const cloudinary = require('cloudinary').v2;

const {
  CustomerGuardian,
  CustomerMinor,
  CustomerGuardianHasCustomerMinor,
} = require('../../../server/models');
const generateHtmlEmail = require('../../../src/utils/emailHtml');
const generatePlainEmail = require('../../../src/utils/emailPlain');
const { signToken } = require('../../../src/utils/auth');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

// email client instance
const sgMail = require('@sendgrid/mail');
const SignedWaivers = require('../../../server/models/SignedWaivers');
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
            as: 'minors',
          },
        ],
      });
      if (!existingCustomerData) {
        throw new AuthenticationError('Incorrect credentials, Please try again');
      }
      const validPassword = await existingCustomerData.checkPassword(password);

      if (!validPassword) {
        throw new AuthenticationError('Incorrect credentials, Please try again');
      }
      const { id, email: customerEmail } = existingCustomerData.dataValues;
      const customerAccessToken = signToken({ id, customerEmail });

      return {
        existingCustomerData,
        customerAccessToken,
      };
    } catch (error) {
      console.log(error);
      return new AuthenticationError('Internal Seerver Error, Please try again');
    }
  },
  customerRegister: async (parent, { guardians, minors = [] }, context) => {
    console.log(guardians);
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
      const newCustomerMinorDataArr = await CustomerMinor.bulkCreate(minorsWithIdArr);
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
        id: '8864c717-587d-472a-929a-8e5f298024da-0',
        displayName: 'Jaydon Frankie',
        email: 'demo@minimals.cc',
        password: 'demo1234',
        photoURL: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_default.jpg',
        phoneNumber: '+40 777666555',
        country: 'United States',
        address: '90210 Broadway Blvd',
        state: 'California',
        city: 'San Francisco',
        zipCode: '94116',
        about:
          'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
        role: 'admin',
        isPublic: true,
      });

      return {
        customer: { ...newCustomerData.get({ plain: true }), minors: newCustomerMinorDataArr },
        customerAccessToken,
      };
    } catch (error) {
      console.log(error);
      throw new AuthenticationError('Internal Server Error, Please try again');
    }
  },
  submitSignedWaiver: async (parent, { signedWaiver, customerId }, context) => {
    try {
      // generate randome UUID for signed waiver
      const UUID = randomUUID();
      let signedWaiverURL;
      // upload signed waiver to cloudinary
      await cloudinary.uploader.upload(
        signedWaiver,
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
          id: customerId,
        },
        include: [
          {
            model: CustomerMinor,
            through: CustomerGuardianHasCustomerMinor,
            as: 'minors',
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
            guardian_id: customerId,
            minor_id: minorId,
          })
        );
      } else {
        // if the customer does not have minors create the links in the signedWaiver table
        await SignedWaivers.create({
          waiverURL: signedWaiverURL,
          guardian_id: customerId,
        });
      }
      await sgMail.send({
        from: 'admin@bloksy.com',
        to: customerResponse.email,
        subject: 'Signed Waiver from Bloksy',
        text: generatePlainEmail(signedWaiverURL),
        html: generateHtmlEmail(signedWaiverURL),
      });
      return {
        signedWaiverURL,
        message: 'Signed Waiver Saved',
      };
    } catch (error) {
      console.log(error);
      throw new AuthenticationError(error);
    }
  },
};
