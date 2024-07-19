import ModelBeats from "../model/beats.js";

class ApiBeats {
  constructor() {
    this.modelBeats = new ModelBeats();
  }

  obtenerBeats = async () => {
    return await this.modelBeats.obtenerBeats();
  }

  insertarBeat = async (beat) => {
    return await this.modelBeats.insertarBeat(beat);
  }
}

export default ApiBeats;