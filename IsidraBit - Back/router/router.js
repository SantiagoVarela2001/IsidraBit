import express from 'express'
import ControladorBeats from '../controlador/beats.js'
import {MercadoPagoConfig, Preference} from 'mercadopago'
import enviarMailValidacion from '../mail/mailValidacion.js';
import config from '../config.js';
import mailComprarBeat from '../mail/mailCompraBeat.js'
import crypto from 'crypto';

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

                console.log('esta es la venta en create preference ----> ',venta)

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
            console.log('esta es la venta en correo verificacion ----> ',venta)

            await enviarMailValidacion(code, email);
        });

        this.router.post('/webhook', (req, res) => {
            try {
              console.log("--------------> Funciono el webhook")
              const xSignatureHeader = req.get('x-signature');
              const payload = req.rawBody; // Asegúrate de que req.rawBody contenga el cuerpo de la solicitud sin procesar
          
              // Verifica la firma
              const isSignatureValid = verifySignature(xSignatureHeader, payload, SECRET_KEY);
          
              if (isSignatureValid) {
                const event = req.body;
          
                // Verifica si el evento es un pago aprobado
                if (event.type === 'payment' && event.data.action === 'payment.updated') {
                  const orderId = event.data.id; // ID del pedido asociado al pago
                  mailComprarBeat(venta.email)
          
                  console.log('Pago aprobado. ID del pedido:', orderId);
                  res.status(200).end(); // Respuesta exitosa al webhook
                } else {
                  res.status(200).end(); // Otro tipo de evento, respuesta exitosa
                }
              } else {
                console.error('Firma no válida. La solicitud no proviene de Mercado Pago.');
                res.status(403).end(); // Firma no válida, respuesta prohibida
              }
            } catch (error) {
              console.error('Error al procesar el webhook:', error);
              res.status(500).end(); // Error interno del servidor
            }
          });
          
          // Función para verificar la firma
          function verifySignature(signature, payload, secretKey) {
            const calculatedSignature = crypto.createHmac('sha256', secretKey).update(payload).digest('hex');
            return signature === calculatedSignature;
          }
        

        return this.router
    }
}   

export default Router