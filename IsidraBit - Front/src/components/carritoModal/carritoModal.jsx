import React from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from "axios";
import { useState } from 'react';
import { SwipeAction, SwipeableListItem, TrailingActions, SwipeableList } from 'react-swipeable-list'
import MailModal from '../mailModal/mailModal';

const precio = import.meta.env.VITE_PRECIO;

const CarritoModal = ({ carrito, cerrarModal, setCarrito, disminuirContador }) => {

    const [agregado, setAgregado] = useState(true);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [mailValidado, setMailValidado] = useState(false);

    const eliminarBeat = (id) => {
        const nuevoCarrito = carrito.filter(beatEnCarrito => beatEnCarrito._id !== id);
        disminuirContador();
        setCarrito(nuevoCarrito);
        setAgregado(false);
    }

    const trailingActions = (id) => (
        <TrailingActions>
            <SwipeAction onClick={() => eliminarBeat(id)} destructive={true}>
            </SwipeAction>
        </TrailingActions>
    );

    const [preferenceId, setPreferenceId] = useState(null);

    initMercadoPago("APP_USR-05492589-700a-4e8d-8f00-5f069ac92694", { locale: "es-AR" });  // "TEST-333b7fa6-9528-4c0c-ab63-3941f1ed3712"

    const createPreference = async () => {
        try {
            const response = await axios.post("http://localhost:8080/isidrabit/create_preference", {
                title: "Beat",
                quantity: carrito.length,
                price: precio,
                beats: carrito,
            });

            const { id } = response.data;
            return id;
        } catch (error) {
            console.log(error);
        }
    };

    const avanzarCompra = async () => {
        const id = await createPreference();
        if (id) {
            setPreferenceId(id);
        }
    };


    const abrirModal = () => {
        setModalAbierto(true)
    }


    return (
        <>
            {modalAbierto ? (
                <MailModal
                    modalAbierto={modalAbierto}
                    setModalAbierto={setModalAbierto}
                    setMailValidado={setMailValidado}
                />
            ) : (
                <div className="modalcarrito">
                    <h1 className='titulo'>Carrito de compras</h1>
                    <div className='beatsEnCarrito'>
                        {carrito.length > 0 ? (
                            <>
                                {carrito.map((beatObj) => (
                                    <div key={beatObj._id}>
                                        <SwipeableList>
                                            <SwipeableListItem trailingActions={trailingActions(beatObj._id)}>
                                                <h3 className='beatCarrito'>{beatObj.nombre}</h3>
                                            </SwipeableListItem>
                                        </SwipeableList>
                                    </div>
                                ))}
                                <h3 className='precio'>${carrito.length * precio}</h3>
                                <div className='botones-modal'>
                                    <button onClick={cerrarModal} className='boton-cerrar-modal'>Cerrar</button>
                                    {!mailValidado ? (
                                        <button onClick={abrirModal} className='boton-comprar-modal'>Validar Email</button>
                                    ) : (
                                        <button onClick={avanzarCompra} className='boton-comprar-modal'>Comprar</button>
                                    )}
                                    {preferenceId && <Wallet initialization={{ preferenceId: preferenceId, redirectMode: 'blank' }} customization={{ texts:{ valueProp: 'smart_option'}}} />}
                                </div>
                            </>
                        ) : (<>
                            <h1>El carrito está vacío.</h1>
                            <div className='botones-modal'>
                                <button onClick={cerrarModal} className='boton-cerrar-modal'>Cerrar</button>
                            </div>
                        </>
                        )}
                    </div>
                </div>
            )}
        </>
    );

}

export default CarritoModal;