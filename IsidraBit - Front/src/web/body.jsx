import Banner from '../components/banner/banner';
import Tarjetas from '../components/tarjetas/tarjetas';
import Servicios from '../components/servicios/servicios';

const Body = ({ incrementarContador, setCarrito, carrito, disminuirContador }) => {

  return (
    <div className='contenedor-body'>

      <Banner/>
    
      <Tarjetas
      incrementarContador={incrementarContador}
      setCarrito={setCarrito}
      carrito={carrito}
      disminuirContador={disminuirContador}/>

      <Servicios/>
    </div>
  );
};

export default Body;