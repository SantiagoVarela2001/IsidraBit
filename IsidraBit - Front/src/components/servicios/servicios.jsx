// src/components/servicios/Servicios.js
import React from 'react';
import Servicio from "../servicio/servicio";
import './servicios.css'; // Asegúrate de tener el archivo CSS correcto importado

const Servicios = () => {
  return (
    <div className='servicios-container'>
    <h2 className='titulo titulo-servicios'>COMO PUEDO AYUDARTE ?</h2>
    <div className='servicios'>
      <Servicio
        nombre="VENTA DE BEATS"
        descripcion="Podés comprar beats de alta calidad para tus producciones musicales." />

      <Servicio
        nombre="PRODUCCION MUSICAL"
        descripcion="Ofrecemos servicios de producción musical profesional para artistas emergentes y establecidos." />

      <Servicio
        nombre="MIXING Y MASTERING"
        descripcion="Mejora la calidad de tus pistas con nuestros servicios de mezcla y masterización." />
    </div>
    </div>
  );
};

export default Servicios;
