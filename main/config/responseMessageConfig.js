'use strict';

//All response messages in the file need to have a corresponding entry in the responseMessages strings file for english strings,
// and the respective strings files of other languages (i.e., fr-CA)
// example RESPONSE_MESSAGE_CODE_E404_SADR001 = 'No address found' This is so translated messages can be shown to the user

module.exports = {
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
};
