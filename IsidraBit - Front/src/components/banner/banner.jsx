import React from 'react';
import imagenFondo from '../../assets/imagen_banner.jpg'; // Asegúrate de ajustar la ruta a donde se encuentra tu imagen
import './banner.css'; // Asegúrate de crear este archivo CSS

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner-image">
        <img src={imagenFondo} alt="Imagen de fondo" className='imagen-banner' />
      </div>
      <div className="banner-description">
        <h2>DEJAME AYUDARTE</h2>
        <h2>A CUMPLIR TUS SUEÑOS</h2>
      </div>
    </div>
  );
};

export default Banner;