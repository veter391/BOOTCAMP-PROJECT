import nodemailer from 'nodemailer';
import crypto from 'node:crypto';

const email = {
  user: process.env.EMAILUSER,
  pass: process.env.EMAIL_PASS,
};

// Configurar el transporte SMTP para mail.com
let transporter = nodemailer.createTransport({
  host: 'smtp.mail.com',
  port: 587,
  secure: false,
  auth: {
    user: email.user,
    pass: email.pass
  }
});

function sendConfirmationEmail({ userEmail, confirmationCode, userName }) {
  let mailOptions = {
    from: email.user,
    to: userEmail,
    subject: 'Confirmación de registro',
    html: 
          `<p>Hola ${userName},
          </p><p>Tu código de confirmación es: 
          <strong>${confirmationCode}</strong>
          </p><p>Gracias</p>`
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Correo de confirmación enviado: ' + info.response);
    }
  });
}

export default { sendConfirmationEmail };