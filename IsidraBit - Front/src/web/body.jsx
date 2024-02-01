import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tarjeta from '../components/tarjeta/tarjeta';

const Body = ({ incrementarContador, setCarrito, carrito, disminuirContador }) => {
  const [beats, setBeats] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [elementosFiltrados, setElementosFiltrados] = useState([]);
  const [mostrarHasta, setMostrarHasta] = useState(4); // Número de tarjetas a mostrar

  const fetchData = () => {
    return axios.get("http://127.0.0.1:8080/Isidrabit/beats")
      .then((response) => setBeats(response.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filtrar elementos por nombre cuando cambia la búsqueda
    const resultadosFiltrados = beats.filter(elemento =>
      elemento.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    setElementosFiltrados(resultadosFiltrados);
  }, [busqueda, beats]);

  const mostrarMasTarjetas = () => {
    setMostrarHasta(prevMostrarHasta => prevMostrarHasta + 4);
  };

  return (
    <div className='contenedor-body'>
      <input
        className='buscador'
        type="text"
        placeholder="Busca tu instrumental"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {elementosFiltrados && elementosFiltrados.length > 0 ? (
        elementosFiltrados.slice(0, mostrarHasta).map((beatObj, index) => (
          <div key={beatObj._id}>
            <Tarjeta
              beat={beatObj}
              incrementarContador={incrementarContador}
              setCarrito={setCarrito}
              carrito={carrito}
              disminuirContador={disminuirContador}
            />
          </div>
        ))
      ) : (
        <h1>No se encontró la instrumental "{busqueda}"</h1>
      )}

      {mostrarHasta < elementosFiltrados.length && (
        <button onClick={mostrarMasTarjetas} className='boton-mostrar-mas'>
          <img src='src\assets\gif-arrow.gif' alt='Flecha hacia abajo' className='mostrar-mas' />
        </button>
      )}
    </div>
  );
};

export default Body;