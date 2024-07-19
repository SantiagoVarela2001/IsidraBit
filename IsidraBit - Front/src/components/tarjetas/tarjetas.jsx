import React, { useEffect, useState } from 'react';
import Tarjeta from '../tarjeta/tarjeta';
import axios from 'axios';

const Tarjetas = ({ incrementarContador, setCarrito, carrito, disminuirContador }) => {
  
const [beats, setBeats] = useState([]);
const [busqueda, setBusqueda] = useState('');
const [elementosFiltrados, setElementosFiltrados] = useState([]);
const [mostrarHasta, setMostrarHasta] = useState(4); // Número de tarjetas a mostrar

const apiBaseURL = import.meta.env.VITE_URL_SERVER;

const fetchData = async () => {
  try {
    const response = await axios.get(`${apiBaseURL}/Isidrabit/beats`);
    return setBeats(response.data);
  } catch (error) {
    return console.error('Error fetching data:', error);
  }
};

useEffect(() => {
  fetchData();
}, []);

useEffect(() => {
  const resultadosFiltrados = beats.filter(elemento =>
    elemento.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  setElementosFiltrados(resultadosFiltrados);
}, [busqueda, beats]);

const mostrarMasTarjetas = () => {
  setMostrarHasta(prevMostrarHasta => prevMostrarHasta + 4);
};
  
    return (
    <div className='contenedor-tarjetas'>

        <h2 className='titulo-tarjetas'>BEATS</h2>
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
          <img src='src\assets\flecha.png' alt='Flecha hacia abajo' className='mostrar-mas' />
        </button>
      )}
    </div>
  );
};

export default Tarjetas;
