'use strict';

//All response messages in the file need to have a corresponding entry in the responseMessages strings file for english strings,
// and the respective strings files of other languages (i.e., fr-CA)
// example RESPONSE_MESSAGE_CODE_E404_SADR001 = 'No address found' This is so translated messages can be shown to the user

module.exports = {
  INVALIDPRO400E: {
    code: 'INVALIDPRO400E',
    status: 'ERROR',
    message: '',
  },
  E401_SADR011: {
    code: 'E401_SADR011',
    status: 'ERROR',
    message: 'Your session has timed out. Please log in again with your credentials.',
  },
  E401_SADR013: {
    code: 'E401_SADR013',
    status: 'ERROR',
    message: 'Forbidden request. Cannot find the resource',
  },
  E400_NOTFOUNDUSER: {
    code: 'E400_NOTFOUNDUSER',
    status: 'ERROR',
    message: 'Not found user',
  },
  E401_INVALIDPASSWORD: {
    code: 'E401_INVALIDPASSWORD',
    status: 'ERROR',
    message: 'Invalid Password',
  },
  S200_LOGINSUCCESS: {
    code: 'S200_LOGINSUCCESS',
    status: 'SUCCESS',
    message: 'Login Successfully',
  },
  S200_LOGINSUCCESS: {
    code: 'S200_LOGINSUCCESS',
    status: 'SUCCESS',
    message: 'Login Successfully',
  },
  E400_INVALIDUSEREMAIL: {
    code: 'E400_INVALIDUSEREMAIL',
    status: 'ERROR',
    message: 'Invalid user email',
  },
  E400_INVALIDUSERPASS: {
    code: 'E400_INVALIDUSERPASS',
    status: 'ERROR',
    message: 'Invalid user password',
  },
  E400_INVALIDUSERROLE: {
    code: 'E400_INVALIDUSERROLE',
    status: 'ERROR',
    message: 'Invalid user role',
  },
  E400_INVALIDUSERPERSO: {
    code: 'E400_INVALIDUSERPERSO',
    status: 'ERROR',
    message: 'Invalid user persona',
  },
  E400_INVALIDUSERFIRNAME: {
    code: 'E400_INVALIDUSERFIRNAME',
    status: 'ERROR',
    message: 'Invalid user firstName',
  },
  E400_INVALIDUSERLASNAME: {
    code: 'E400_INVALIDUSERLASNAME',
    status: 'ERROR',
    message: 'Invalid user lastName',
  },
  E400_INVALIDUSERLANGUAGE: {
    code: 'E400_INVALIDUSERLANGUAGE',
    status: 'ERROR',
    message: 'Invalid user preferredLanguage',
  },
  E409_DUPUSEREMAIL: {
    code: 'E409_DUPUSEREMAIL',
    status: 'ERROR',
    message: 'Email have already created with other user',
  },
  S201_CREATECUSSUC: {
    code: 'S201_CREATECUSSUC',
    status: 'SUCCESS',
    message: 'Create customer Successfully',
  },
};
