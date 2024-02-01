import dotenv from 'dotenv'

dotenv.config()

//    SERVIDOR
const PORT = process.env.PORT || 8080
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA || 'MONGODB'    // 'MEM' - 'FILE' - 'MONGODB'
const STRCNX = process.env.STRCNX || 'mongodb://127.0.0.1'
const BASE = process.env.BASE || 'test'

//    NODEMAILER
const EMAIL_SERVICE = process.env.EMAIL_SERVICE
const EMAIL_HOST = process.env.EMAIL_HOST
const EMAIL_PORT = process.env.EMAIL_PORT
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS

//    MERCADO PAGO

const ACCES_TOKEN = process.env.ACCES_TOKEN;
const SECRET_KEY = process.env.SECRET_KEY;


export default {
    PORT,
    MODO_PERSISTENCIA,
    STRCNX,
    BASE,
    EMAIL_SERVICE,
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
    ACCES_TOKEN,
    SECRET_KEY
}