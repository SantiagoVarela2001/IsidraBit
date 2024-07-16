import express from 'express';
import RouterServer from './router/router.js';
import db from './model/DAOs/db.js';
import cors from 'cors';
import bodyParser from 'body-parser';
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

        // Configuración de CORS
        this.app.use(cors({
            origin: "https://isidrabit.netlify.app",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            preflightContinue: false,
            optionsSuccessStatus: 204
        }));

        /* ------------------------------------------------------------- */
        /*             API REST Ful                                      */
        /* ------------------------------------------------------------- */
        this.app.use('/isidrabit', new RouterServer(this.persistencia).start());

        /* ------------------------------------------------------------- */
        /*                      Servidor LISTEN                          */
        /* ------------------------------------------------------------- */
        if (config.MODO_PERSISTENCIA === 'MONGODB') {
            try {
                await db.conectar();
                console.log('Conexión a MongoDB establecida');
            } catch (error) {
                console.error('Error conectando a la base de datos:', error);
                process.exit(1); // Salir si no se puede conectar a la base de datos
            }
        }

        const PORT = this.port;
        this.server = this.app.listen(PORT, () => 
            console.log(`Servidor express escuchando en el puerto ${PORT}`)
        );

        this.server.on('error', error => 
            console.error('Servidor express en error:', error)
        );

        return this.app;
    }

    async stop() {
        this.server.close(() => console.log('Servidor detenido'));
        await db.desconectar();
    }
}

export default Server;
