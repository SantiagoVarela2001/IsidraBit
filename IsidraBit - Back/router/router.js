import express from 'express'
import ControladorBeats from '../controlador/beats.js'
import enviarCorreoVerificacion from '../controlador/correoVerificacionController.js';
import bodyParser from 'body-parser';

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

    this.router.post('/enviar-correo-verificacion', enviarCorreoVerificacion);

    return this.router;
  }
}

export default Router;