import ApiBeats from '../API/beats.js'


class ControladorBeats {

    constructor() {
        this.apiBeats = new ApiBeats()
    } 
    obtenerBeats = async (req, res) =>{ 
    res.json(await this.apiBeats.obtenerBeats())

    }

    insertarBeat = async (req, res) => {
        const beat = req.body;
        const result = await this.apiBeats.insertarBeat(beat);
        res.json(result);
    }
    
    
}

export default ControladorBeats