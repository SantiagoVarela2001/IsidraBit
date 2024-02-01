import React from 'react'
import bolsaComprasImg from '../assets/bolsa-compras.png'

const header = ({ contador, irAlCarrito }) => {
  return (
    <>
      <header>
        <h1 className='titulo'>ISIDRA BIT</h1>
        <div className='contenedor-bolsa' onClick={irAlCarrito}>
          <img src={bolsaComprasImg} alt="bolsa de compras" className="rounded float-right bolsaComprasImg"></img>
          <h4 className='contador'>{contador}</h4>
        </div>
      </header>
    </>
  );
}

export default header