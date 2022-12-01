const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true, jsonPointers: true });
require('ajv-errors')(ajv);
require('ajv-keywords')(ajv, ['transform', 'regexp']);
const user = require('../schemaProperties/user');

const userValidationSchema = {
  $id: '/properties/userValidationSchema',
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  allOf: [
    {
      properties: {
        email: user.email,
        password: user.password,
        userRole: user.userRole,
        persona: user.persona,
        firstName: user.firstName,
        lastName: user.lastName,
        preferredLanguage: user.preferredLanguage,
      },
      additionalProperties: true,
    },
  ],
  required: ['email', 'password', 'firstName', 'lastName'],
  errorMessage: user.userErrorMessage,
};

const userValidation = ajv.compile(userValidationSchema);

module.exports = {
  userValidation,
  userValidationSchema,
};
