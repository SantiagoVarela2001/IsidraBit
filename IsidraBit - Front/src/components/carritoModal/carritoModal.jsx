import React, { useState } from 'react';
import MailModal from '../mailModal/mailModal';
import TransaccionModal from '../transaccionModal/transaccionModal';

const precio = import.meta.env.VITE_PRECIO;

const CarritoModal = ({ carrito, cerrarModal, setCarrito, disminuirContador }) => {
    const [mailModalAbierto, setMailModalAbierto] = useState(false);
    const [mailValidado, setMailValidado] = useState(false);
    const [compraRealizada, setCompraRealizada] = useState(false);

    const eliminarBeat = (id) => {
        const nuevoCarrito = carrito.filter(beatEnCarrito => beatEnCarrito._id !== id);
        disminuirContador();
        setCarrito(nuevoCarrito);
    };

    const abrirMailModal = () => {
        if (!mailModalAbierto) {
            setMailModalAbierto(true);
        }
    };

    const cerrarMailModal = () => {
        setMailModalAbierto(false);
    };

    const realizarCompra = () => {
        if (!compraRealizada) {
            setCompraRealizada(true);
            // Realizar lógica adicional aquí si es necesario
        }
    };

    const cerrarTransaccionModal = () => {
        setCompraRealizada(false);
        setCarrito([]); // Reiniciar el carrito
        disminuirContador(); // Ajustar contador
        cerrarModal(); // Cerrar modal principal si es necesario
    };

    // Depuración: muestra el estado actual de los estados relevantes
    console.log('mailModalAbierto:', mailModalAbierto);
    console.log('compraRealizada:', compraRealizada);

    return (
        <>
            {mailModalAbierto && (
                <MailModal
                    modalAbierto={mailModalAbierto}
                    setModalAbierto={setMailModalAbierto}
                    setMailValidado={setMailValidado}
                    cerrarMailModal={cerrarMailModal}
                />
            )}

            <div className="modalcarrito">
                <h1 className='titulo'>Carrito de compras</h1>
                <div className='beatsEnCarrito'>
                    {carrito.length > 0 ? (
                        <>
                            {carrito.map((beatObj) => (
                                <div key={beatObj._id}>
                                    <div className='beatCarrito'>
                                        <h3>{beatObj.nombre}</h3>
                                        <button
                                            className="eliminar-btn"
                                            onClick={() => eliminarBeat(beatObj._id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <h3 className='precio'>Total a Pagar: ${carrito.length * precio}</h3>
                            <div className='botones-modal'>
                                <button onClick={cerrarModal} className='boton-cerrar-modal'>Cerrar</button>
                                {!mailValidado ? (
                                    <button onClick={abrirMailModal} className='boton-comprar-modal'>Validar Email</button>
                                ) : (
                                    <button onClick={realizarCompra} className='boton-comprar-modal'>Comprar</button>
                                )}
                            </div>
                            {compraRealizada && (
                                <TransaccionModal
                                    modalAbierto={compraRealizada}
                                    cerrarModal={cerrarTransaccionModal}
                                    carrito={carrito}
                                    setCompraRealizada={setCompraRealizada}
                                />
                            )}
                        </>
                    ) : (
                        <>
                            <h1>El carrito está vacío.</h1>
                            <div className='botones-modal'>
                                <button onClick={cerrarModal} className='boton-cerrar-modal'>Cerrar</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default CarritoModal;