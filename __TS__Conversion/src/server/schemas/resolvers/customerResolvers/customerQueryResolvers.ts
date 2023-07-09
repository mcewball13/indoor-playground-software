import { GraphQLError } from 'graphql';
import { v2 as cloudinary } from 'cloudinary';
import { Op } from 'sequelize';

import { CustomerGuardian } from '../../../models';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

// email client instance
import sgMail from '@sendgrid/mail';

if (typeof process.env.SENDGRID_API_KEY === 'string') {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export default {
  emailExists: async (parent: unknown, { email }: Record<string, any>, context: any) => {
    try {
      const customerGuardianData = await CustomerGuardian.findOne({
        attributes: { exclude: ['password'] },
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
      throw new GraphQLError('Something went wrong, please try again.', {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  },
  userAccountAutoSearch: async (parent: unknown, { filter }: string, context: any) => {
    return CustomerGuardian.findAll({
      where: {
        [Op.or]: [
          { guardianFirstName: { [Op.like]: `%${filter}%` } },
          { guardianLastName: { [Op.like]: `%${filter}%` } },
          { email: { [Op.like]: `%${filter}%` } },
          { phoneNumber: { [Op.like]: `%${filter}%` } },
        ],
      },
    });
  },
};
