const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function sendVerificationEmail(to, token) {
  const url = `${process.env.BASE_URL}/verify?token=${token}`;
  return transporter.sendMail({
    from: `"App" <${process.env.MAIL_USER}>`,
    to,
    subject: 'Подтвердите регистрацию',
    html: `<p>Перейдите по ссылке для подтверждения:</p><a href="${url}">${url}</a>`,
  });
}

module.exports = sendVerificationEmail;
