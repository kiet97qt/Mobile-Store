const nodemailer = require('nodemailer');

function sendMailFromAdmin(mailOptions) {
  // console.log("mailOptions", mailOptions)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'kietnodejs1997@gmail.com',
      pass: 'redagon291',
    },
  });
  return transporter
    .sendMail(mailOptions)
    .then((data) => Promise.resolve({ message: 'Sent Email Restore Successfully: ', data }))
    .catch((err) => Promise.reject({ message: `Error: ${err} ` }));
}

const generateErrorObject = (logMessage, statusCode, responseMessageConfigCode, replacements = null, data) => {
  let errorObj = new Error(logMessage);
  errorObj.statusCode = statusCode;
  errorObj.responseMessageConfigCode = responseMessageConfigCode;
  errorObj.logMessage = logMessage;
  errorObj.replacements = replacements;
  errorObj.data = data;
  return errorObj;
};

const extractAjvErrors = (errors) => {
  return errors.map((error) => error.message);
};

module.exports = {
  sendMailFromAdmin,
  generateErrorObject,
  extractAjvErrors,
};
