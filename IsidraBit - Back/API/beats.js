import ModelBeats from "../model/beats.js";

class ApiBeats {
  constructor() {
    this.modelBeats = new ModelBeats();
  }

  obtenerBeats = async () => {
    return await this.modelBeats.obtenerBeats();
  }

  insertarBeat = async (req) => {
    const beat = req.body;  // Asumiendo que el cuerpo de la solicitud contiene el beat
    return await this.modelBeats.insertarBeat(beat);
  }
}

export default ApiBeats;