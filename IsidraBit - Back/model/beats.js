import { ObjectId } from "mongodb"
import CnxMongoDB from "../model/DAOs/db.js"

class ModelMongoDB {

    

    obtenerBeats = async id => {
        try{
            if(!CnxMongoDB.connectOk) return id? {} : []

            if(id) {
                const beat = await CnxMongoDB.db.collection('beats').findOne({_id: new ObjectId(id)})
                
                if(beat){
                    return beat
                }
                else{
                    return {}
                }
            }
            else {
                const beats = await CnxMongoDB.db.collection('beats').find({}).toArray()
                return beats
            }
        }
        catch(error) {
            console.log('error en obtener Beats', error)
            if(id) {
                return {}
            }
            else {
                return []
            }
        }
    }

    insertarBeat = async beat => {
        try{
            if(!CnxMongoDB.connectOk) return {}
            await CnxMongoDB.db.collection('beats').insertOne(beat)
            console.log("model ---> ", beat)
            return beat
        }
        catch(error) {
            console.log('error en guardarReserva:', error)
            return {}
        }  
    }
}

export default ModelMongoDB