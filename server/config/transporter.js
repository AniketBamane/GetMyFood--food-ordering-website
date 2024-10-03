import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aniketbamane696@gmail.com',
    pass: 'hvcv kyvl ogwb zxxp',
  },
});

export default transporter