const nodemailer = require('nodemailer');
require('dotenv').config();

const resetLink=process.env.Password_Recover;

const sendPasswordRecoveryEmail = async (to) => {

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Password Recovery - Reset Your Password',
    html: `
      <h1>Password Reset Request</h1>
      <p>Hello from EventLink,</p>
      <p>It seems like you requested a password reset. Please click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
      <br>
      <p><strong>Best Regards,</strong></p>
      <p>EventLink</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendPasswordRecoveryEmail
};
