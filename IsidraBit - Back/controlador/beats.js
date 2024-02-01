import ApiBeats from '../API/beats.js'


class ControladorBeats {

    constructor() {
        this.apiBeats = new ApiBeats()
    }
    obtenerBeats = async (req, res) =>{ 
    res.json(await this.apiBeats.obtenerBeats())

    }

    insertarBeat = async (req, res) =>{
        res.json(await this.apiBeats.insertarBeat(req))
    
        }
    
    
}

export default ControladorBeats