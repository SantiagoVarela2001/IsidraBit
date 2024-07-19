import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiBaseURL = import.meta.env.VITE_URL_SERVER;

const SecretAddBeatPage = () => {
    const [nombre, setNombre] = useState('');
    const [bpm, setBpm] = useState('');
    const [urlPista, setUrlPista] = useState('');
    const [genero, setGenero] = useState('');
    const [token, setToken] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBeat = { nombre, bpm, urlPista, genero };
        fetch(`${apiBaseURL}/isidrabit/beat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(newBeat),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Beat added:', data);
            setNombre(""),
            setBpm(""),
            setUrlPista(""),
            setGenero("")
        })
        .catch(error => {
            console.error('Error adding beat:', error);
        });
    };

    return (
        <div className="container mt-5" style={{ color: 'white' }}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card bg-dark">
                        <div className="card-header text-center">
                            <h1>Agregar Nuevo Beat</h1>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        placeholder="Nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="bpm">BPM</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="bpm"
                                        placeholder="BPM"
                                        value={bpm}
                                        onChange={(e) => setBpm(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="urlPista">URL de YouTube</label>
                                    <input
                                        type="url"
                                        className="form-control"
                                        id="urlPista"
                                        placeholder="URL de YouTube"
                                        value={urlPista}
                                        onChange={(e) => setUrlPista(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="genero">Género</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="genero"
                                        placeholder="Género"
                                        value={genero}
                                        onChange={(e) => setGenero(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="token">Token Secreto</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="token"
                                        placeholder="Token Secreto"
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Agregar Beat</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecretAddBeatPage;
