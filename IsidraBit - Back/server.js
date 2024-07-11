import express from 'express';
import RouterServer from './router/router.js';
import db from './model/DAOs/db.js';
import cors from 'cors';
import bodyParser from 'body-parser'; // Importar body-parser
import config from './config.js';

class Server {

    constructor(port, persistencia) {
        this.app = express();
        this.port = port;
        this.persistencia = persistencia;
    }

    async start() {
        // Configurar body-parser para manejar solicitudes JSON y URL codificadas
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use(cors({
            origin: "http://localhost:5173"
        }));

        /* ------------------------------------------------------------- */
        /*             API REST Ful                                      */
        /* ------------------------------------------------------------- */
        this.app.use('/isidrabit', new RouterServer(this.persistencia).start());

        /* ------------------------------------------------------------- */
        /*                      Servidor LISTEN                          */
        /* ------------------------------------------------------------- */
        if (config.MODO_PERSISTENCIA == 'MONGODB') {
            await db.conectar();
        }
        const PORT = this.port;
        this.server = this.app.listen(PORT, () => console.log(`Servidor express escuchando en el puerto http://localhost:${PORT}`));
        this.server.on('error', error => console.log('Servidor express en error:', error));

        return this.app;
    }

    async stop() {
        this.server.close();
        await db.desconectar();
    }
}

export default Server;
