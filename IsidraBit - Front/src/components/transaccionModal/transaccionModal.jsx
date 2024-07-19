import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const TransaccionModal = ({ modalAbierto, cerrarModal, carrito, resetCarrito, setCompraRealizada }) => {
    const precio = import.meta.env.VITE_PRECIO;

    const generateTransactionNumber = () => {
        return Math.floor(100000 + Math.random() * 900000);
    };

    const transactionNumber = generateTransactionNumber();

    const handleCancelar = () => {
        setCompraRealizada(false);
    };

    return (
        <Modal show={modalAbierto} onHide={() => {}}>
            <Modal.Header closeButton>
                <Modal.Title>Información de la Transacción</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="transaction-details">
                    <p><strong>Número de Transacción:</strong> <span className='destacado'>{transactionNumber}</span></p>
                    <p><strong>CVU:</strong> 0000003100076538253405</p>
                    <p><strong>Nombre del dueño:</strong> Santiago Varela</p>
                    <p><strong>Email:</strong> Santiago.vrl.12@gmail.com</p>
                    <p><strong>Monto Total a Pagar:</strong> <span className='destacado'>${carrito.length * precio}</span></p>
                    <p><strong>Beats Solicitados:</strong></p>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nombre del Beat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carrito.map(beatEnCarrito => (
                                <tr key={beatEnCarrito._id}>
                                    <td>{beatEnCarrito.nombre}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <p>Una vez transferido, pasar el comprobante al correo <span className='destacado'>santiago.vrl.12@gmail.com</span> con el asunto: "Nombre de los Beats Comprados y Número de Transacción"</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancelar}>Cancelar</Button>
                <Button variant="primary" onClick={cerrarModal}>Pagado</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TransaccionModal;