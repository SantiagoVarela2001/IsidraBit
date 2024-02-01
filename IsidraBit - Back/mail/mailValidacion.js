import nodemailer from 'nodemailer';
import con from '../config.js';

const enviarMail = async (codigo, mail) => {
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
    subject: 'Código de Verificación IsidraBit',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <h2>¡Bienvenido a IsidraBit!</h2>
        <p>Su código de verificación es: <strong>${codigo}</strong></p>
        <p>Por favor, utilice este código para completar su proceso de verificación.</p>
        <p>Si no solicitó esto, puede ignorar este correo electrónico.</p>
      </div>
    `
  };

  try {
    // Enviar el correo electrónico
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
};

export default enviarMail;