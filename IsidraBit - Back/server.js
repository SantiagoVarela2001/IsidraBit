import express from 'express'
import RouterServer from './router/router.js'
import db from './model/DAOs/db.js';
import cors from 'cors'
import config from './config.js'




class Server {

    constructor(port, persistencia) {
        this.app = express()
        this.port = port
        this.persistencia = persistencia
    }
async start() {



this.app.use(express.json())
this.app.use(express.urlencoded({extended: true}))
this.app.use(cors({
    origin:"http://localhost:5173"
}))


/* ------------------------------------------------------------- */
/*             API REST Ful                                      */
/* ------------------------------------------------------------- */

this.app.use('/isidrabit', new RouterServer(this.persistencia).start())

//app.use('/LaMixtureria/Playlist', RouterServer().start)


/* ------------------------------------------------------------- */
/*                      Servidor LISTEN                          */
/* ------------------------------------------------------------- */
if(config.MODO_PERSISTENCIA == 'MONGODB') {
    //await CnxMongoDB.conectar()
    await db.conectar()
}
const PORT = this.port
this.server = this.app.listen(PORT, () => console.log(`Servidor express escuchando en el puerto http://127.0.0.1:${PORT}`))
this.server.on('error', error => console.log('Servidor express en error:', error))
   
return this.app
} 
async stop() {
    this.server.close()
    await db.desconectar()
}
   
}
export default Server
