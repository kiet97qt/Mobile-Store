'use strict';
const responseMessageConfig = require('../../config/responseMessageConfig');

const email = {
  $id: '/properties/user/email',
  type: 'string',
  transform: ['trim'],
  minLength: 1,
};

const password = {
  $id: 'properties/user/password',
  type: 'string',
  transform: ['trim'],
  minLength: 8,
  maxLength: 15,
};

const userRole = {
  $id: '/properties/user/userRole',
  type: 'string',
};

const persona = {
  $id: '/properties/user/persona',
  type: 'string',
};

const firstName = {
  $id: '/properties/user/firstName',
  type: 'string',
  transform: ['trim'],
  minLength: 1,
};

const lastName = {
  $id: '/properties/user/lastName',
  type: 'string',
  transform: ['trim'],
  minLength: 1,
};

const preferredLanguage = {
  $id: '/properties/user/preferredLanguage',
  type: 'string',
};

const userErrorMessage = {
  properties: {
    email: `RESPONSE_MESSAGE_CODE_${responseMessageConfig.E400_INVALIDUSEREMAIL.code}`,
    password: `RESPONSE_MESSAGE_CODE_${responseMessageConfig.E400_INVALIDUSERPASS.code}`,
    userRole: `RESPONSE_MESSAGE_CODE_${responseMessageConfig.E400_INVALIDUSERROLE.code}`,
    persona: `RESPONSE_MESSAGE_CODE_${responseMessageConfig.E400_INVALIDUSERPERSO.code}`,
    firstName: `RESPONSE_MESSAGE_CODE_${responseMessageConfig.E400_INVALIDUSERFIRNAME.code}`,
    lastName: `RESPONSE_MESSAGE_CODE_${responseMessageConfig.E400_INVALIDUSERLASNAME.code}`,
    preferredLanguage: `RESPONSE_MESSAGE_CODE_${responseMessageConfig.E400_INVALIDUSERLANGUAGE.code}`,
  },
  required: {
    email: 'Email not entered',
    password: 'Password not entered',
    firstName: 'FirstName not entered',
    lastName: 'LastName not entered',
  },
};

module.exports = {
  email,
  password,
  userRole,
  persona,
  firstName,
  lastName,
  preferredLanguage,
  userErrorMessage,
};
