import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

export const sendVerificationEmail = async (email, token) => {
  const link = `http://localhost:5173/verify?token=${token}`
  await transporter.sendMail({
    from: 'noreply@analytics.com',
    to: email,
    subject: 'Подтверждение регистрации',
    html: `<p>Перейдите по ссылке для подтверждения: <a href="${link}">${link}</a></p>`
  })
}
