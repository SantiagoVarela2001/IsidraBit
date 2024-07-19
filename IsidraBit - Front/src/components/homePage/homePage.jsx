import './homePage.css';
import { useState } from 'react';
import Header from '../../web/header';
import Body from '../../web/body';
import Footer from '../../web/footer';
import CarritoModal from '../carritoModal/carritoModal';

function HomePage() {
  const [contador, setContador] = useState(0);
  const [carrito, setCarrito] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);

  const incrementarContador = () => {
    setContador(contador + 1);
  };

  const disminuirContador = () => {
    setContador(contador - 1);
  };

  const irAlCarrito = () => {
    setModalAbierto(true);
  }

  const cerrarModal = () => {
    setModalAbierto(false);
    setCarrito([])
    setContador(0)
  };


  return (
    <>
      {modalAbierto ? (
        <CarritoModal carrito={carrito} cerrarModal={cerrarModal} setCarrito={setCarrito} disminuirContador={disminuirContador}/>
      ) : (
        <>
          <Header contador={contador} irAlCarrito={irAlCarrito} />

          <Body incrementarContador={incrementarContador}
            setCarrito={setCarrito}
            carrito={carrito}
            disminuirContador={disminuirContador}/>
            
          <Footer />
        </>
      )}
    </>
  );
}

export default HomePage;