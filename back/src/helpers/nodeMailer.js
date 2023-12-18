import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendConfirmationEmail(userEmail, username, confirmationCode) {
    const registerEmail = {
      from: process.env.EMAILUSER, // Cambia esto por tu dirección de correo electrónico
      to: userEmail,
      subject: '¡Bienvenid@! Activa tu cuenta',
      text: `Hola ${username}, ¡Bienvenid@ a la app de El Prat! Confirma tu cuenta haciendo clic en el siguiente enlace: http://localhost:5000/users/confirm/${confirmationCode}`,
      html: `
        <h1>Hola ${username}, ¡Bienvenid@ a la app de El Prat!</h1>
        <h2>Confirma tu cuenta haciendo clic en el siguiente enlace</h2>
        <a href="http://localhost:5000/users/confirm/${confirmationCode}">Confirmar cuenta</a>
      `,
      headers: {
        'My-Custom-Header': 'IMPORTANT Confirmation Email:'
      },
    };

    try {
      await this.transporter.sendMail(registerEmail);
    } catch (error) {
      throw new Error('Error al enviar el correo de confirmación');
    }
  }
}

const emailService = new EmailService();
export default emailService;