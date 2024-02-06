import express from 'express'
import ControladorBeats from '../controlador/beats.js'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import enviarMailValidacion from '../mail/mailValidacion.js';
import config from '../config.js';
import mailComprarBeat from '../mail/mailCompraBeat.js'
import crypto from 'crypto';
import bodyParser from 'body-parser';

const client = new MercadoPagoConfig({
  accessToken: config.ACCES_TOKEN,
});

const SECRET_KEY = config.SECRET_KEY;

const venta = {};

class Router {
  constructor(persistencia) {
    this.router = express.Router()
    this.controladorBeats = new ControladorBeats(persistencia)
  }

  start() {
    this.router.use(bodyParser.json());
    this.router.use(bodyParser.urlencoded({ extended: true }));
    this.router.get('/beats', this.controladorBeats.obtenerBeats)
    this.router.post('/beat', this.controladorBeats.insertarBeat)

    this.router.post("/create_preference", async (req, res) => {
      try {
        const body = {
          items: [
            {
              title: req.body.title,
              quantity: Number(req.body.quantity),
              unit_price: Number(req.body.price),
              beats: req.body.beats,
              currency_id: "ARS",
            },
          ],
          back_urls: {
            success: "https://www.youtube.com/channel/UCD5TSNNoDvnXwvz9biaiv2Q",
            failure: "https://www.youtube.com/channel/UCD5TSNNoDvnXwvz9biaiv2Q",
            pending: "https://www.youtube.com/channel/UCD5TSNNoDvnXwvz9biaiv2Q",
          },
          auto_return: "approved",
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });



        // Guarda la información en la variable 'venta'
        venta.preferenceId = result.id;
        venta.beats = req.body.beats;

        console.log('esta es la venta en create preference ----> ', venta)

        res.json({
          id: result.id,
        });

      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: "Error al crear la preferencia",
        });
      }
    });

    this.router.post('/enviar-correo-verificacion', async (req, res) => {
      const { email, code } = req.body;

      // Guarda la información en la variable 'venta'
      venta.email = email;
      console.log('esta es la venta en correo verificacion ----> ', venta)

      await enviarMailValidacion(code, email);
    });

    this.router.post('/webhook', (req, res) => {
      try {
        const xSignatureHeader = req.get('x-signature');
        const payload = JSON.stringify(req.body);

        const isSignatureValid = verifySignature(xSignatureHeader, payload, SECRET_KEY);

        if (isSignatureValid) {
          const event = req.body;

          if (event.type === 'payment' && event.data.action === 'payment.updated') {
            // Implementación de la lógica del webhook para pago aprobado
            mailComprarBeat(venta.email)
          } else {
            // Implementación de la lógica para otros tipos de eventos
          }
        } else {
          console.error('Firma no válida. La solicitud no proviene de Mercado Pago.');
        }
      } catch (error) {
        console.error('Error al procesar el webhook:', error);
      } finally {
        res.status(200).end();
      }
    });

    return this.router;
  }
}

function verifySignature(signature, payload, secretKey) {
  // Extraer el timestamp (ts) y la clave del header x-signature
  const [ts, v1] = signature.split(',');

  // Obtener el valor de la clave v1
  const [, claveEncriptada] = v1.split('=');

  // Obtener el valor de la clave ts
  const [, calculatedTs] = ts.split('=');

  // Calcular el HMAC utilizando el payload y la clave secreta
  const claveCalculada = crypto
  .createHmac('sha256', secretKey)
  .update(payload)
  .digest('hex'); 

  // Comparar la firma calculada con la firma proporcionada
  console.log("claveEncriptada ---->", claveEncriptada, "claveCalculada ------>", claveCalculada);
  return claveEncriptada === claveEncriptada;
}


export default Router;