import React from 'react';
import Video from '../video/video';
import { useState } from 'react';

const Tarjeta = ({ beat, incrementarContador, setCarrito, carrito, disminuirContador}) => {

  const [agregado, setAgregado] = useState(false);

  const { _id, urlPista, nombre, genero, pathBeat, bpm } = beat;

  const agregarAlCarrito = () => {
    if (!carrito.find(beatEnCarrito => beatEnCarrito._id === _id)) {
      incrementarContador();
      setCarrito(prevCarrito => [...prevCarrito, beat]);
      setAgregado(true);
    }
  };

  const quitarDelCarrito = () => {
    const nuevoCarrito = carrito.filter(beatEnCarrito => beatEnCarrito._id !== _id);
    disminuirContador();
    setCarrito(nuevoCarrito);
    setAgregado(false);
  };

  return (
    <div className="tarjeta">
      <Video url={urlPista} />
      <div className="informacion">
        <h2 className='nombre-beat'>{nombre}</h2>
        <p className='genero'>{genero.toUpperCase()}</p>
        <p className='bpm'>BPM: {bpm}</p>
        <button onClick={agregado ? quitarDelCarrito : agregarAlCarrito} className='agregar-quitar-carrito-button'>
          {agregado ? 'Quitar del carrito' : 'Agregar al Carrito'}
        </button>
      </div>
    </div>
  );
}

export default Tarjeta;