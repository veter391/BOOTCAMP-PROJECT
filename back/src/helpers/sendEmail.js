import nodemailer from 'nodemailer';

const { SMTP_KEY, SMTP_USER, SMTP_URL, SMTP_PORT } = process.env;

// Yo lo he configurado con https://app.brevo.com/
const emailConfig = {
  host: SMTP_URL,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_KEY
  }
};

const transporter = nodemailer.createTransport(emailConfig);

async function sendEmail ({ to, subject, content }) {
  const sendingOptions = {
    from: '"Connect People" <connect@people.com>',
    to,
    subject,
    html: content
  };

  const info = await transporter.sendMail(sendingOptions);
  console.log(info);
}

export { sendEmail };
