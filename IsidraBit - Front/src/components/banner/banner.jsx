import React from 'react';
import imagenFondo from '../../assets/imagen_banner.jpg'; // Asegúrate de ajustar la ruta a donde se encuentra tu imagen
import './banner.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap

const Banner = () => {
  return (
    <div className="container-fluid banner-container d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-6 d-flex justify-content-center align-items-center banner-image">
          <img src={imagenFondo} alt="Imagen de fondo" className='img-fluid imagen-banner' />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center banner-description">
          <h2>DEJAME AYUDARTE</h2>
          <h2>A CUMPLIR TUS SUEÑOS</h2>
        </div>
      </div>
    </div>
  );
};

export default Banner;
