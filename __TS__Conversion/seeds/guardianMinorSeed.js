const { CustomerGuardianHasCustomerMinor } = require('../src/server/models');
const { faker } = require('@faker-js/faker');

const _GUARDIAN_HAS_MINORS = [];

for (let i = 0; i < 5000; i++) {
  _GUARDIAN_HAS_MINORS.push({
    guardian_id: Math.floor(Math.random() * 8000 + 1),
    minor_id: Math.floor(Math.random() * 8000 + 1),
  });
}

const seedGuardiansMinors = () => {
  try {
    return CustomerGuardianHasCustomerMinor.bulkCreate(_GUARDIAN_HAS_MINORS);
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedGuardiansMinors;
