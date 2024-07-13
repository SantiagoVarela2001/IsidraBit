import React from 'react';
import './servicio.css';

const Servicio = ({ nombre, descripcion }) => {
  const instagramLink = "https://www.instagram.com/isidra_bit/";

  return (
    <div className='servicio'>
      <h2 className='titulo-servicio'>{nombre}</h2>
      <p className='descripcion-servicio'>{descripcion}</p>
      <a href={instagramLink} target="_blank" rel="noopener noreferrer">
        <button className='contact-button'>CONTACTAME !!</button>
      </a>
    </div>
  );
};

export default Servicio;