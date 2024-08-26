const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: "HealthLogs Inc. <no-reply@healthlogs.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.html,
  });
};

module.exports = sendMail;
