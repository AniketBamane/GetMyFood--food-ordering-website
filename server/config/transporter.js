import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aniketbamane696@gmail.com',
    pass: 'zoti mgkv mtnr hpzz',
  },
});

export default transporter