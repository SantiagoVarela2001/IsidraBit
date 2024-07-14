import enviarMailValidacion from '../mail/mailValidacion.js';

const venta = {};

const enviarCorreoVerificacion = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({
      error: "Email y código son requeridos",
    });
  }

  try {
    venta.email = email;
    console.log('Esta es la venta en correo verificación ----> ', venta);
    await enviarMailValidacion(code, email);
    return res.status(200).json({
      message: "Correo de verificación enviado",
    });
  } catch (error) {
    console.error('Error al enviar correo de verificación:', error);
    return res.status(500).json({
      error: "Error al enviar correo de verificación",
    });
  }
};

export default enviarCorreoVerificacion;
