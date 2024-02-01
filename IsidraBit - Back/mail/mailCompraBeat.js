import nodemailer from 'nodemailer';
import con from '../config.js';

const enviarMail = async (mail) => {
  // Configuración del servicio de correo
  const transporter = nodemailer.createTransport({
    host: con.EMAIL_HOST,
    port: con.EMAIL_PORT,
    auth: {
      user: con.EMAIL_USER,
      pass: con.EMAIL_PASS
    }
  });

  // Contenido del correo electrónico
  const mailOptions = {
    from: `"IsidraBit" <${con.EMAIL_USER}>`,
    to: mail,
    subject: 'Tus nuevas Instrumentales !!',
    text: 'Adjunto encontrarás las instrumentales que compraste.',
  };

  try {
    // Enviar el correo electrónico
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
};

export default enviarMail;