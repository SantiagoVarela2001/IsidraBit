import sqlite3 from 'sqlite3';

class Beats {
    constructor() {
        this.db = new sqlite3.Database('Beats.db');
        this.initDatabase();
    }

    initDatabase() {
        this.db.serialize(() => {
            this.db.run('CREATE TABLE IF NOT EXISTS beats (id INTEGER PRIMARY KEY, nombre TEXT, genero TEXT, urlPista TEXT)');
        });
    }

    insertarBeat(beat) {
        const stmt = this.db.prepare('INSERT INTO beats (nombre, genero, urlPista) VALUES (?, ?, ?)');
        stmt.run(beat.nombre, beat.genero, beat.urlPista);
        stmt.finalize();
    }

    obtenerBeats() {
        this.db.all('SELECT * FROM beats', (err, rows) => {
          if (err) {
            console.log('Error al obtener beats:', err);
            callback(err, null);
          } else {
            return rows;
          }
        });
      }
}

export default Beats;