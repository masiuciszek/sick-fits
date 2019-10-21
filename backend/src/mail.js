const nodeMailer = require('nodemailer');

const transport = nodeMailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const makeNiceTemplateEmail = text => `
  <div> <h2>Hello there</h2> <p>${text}</p>  <span>😎</span> </div>

`;

exports.transport = transport;
exports.makeNiceTemplateEmail = makeNiceTemplateEmail;
