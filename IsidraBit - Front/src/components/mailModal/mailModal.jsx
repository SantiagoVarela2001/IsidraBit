import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from "axios";

const MailModal = ({ modalAbierto, setModalAbierto, setMailValidado }) => {
  const [userEnteredCode, setUserEnteredCode] = useState('');
  const [userEnteredMail, setUserEnteredMail] = useState('');
  const [codigoVerificacion, setCodigoVerificacion] = useState('');
  const [validacionExitosa, setValidacionExitosa] = useState(false);
  const [envioCorreoExitoso, setEnvioCorreoExitoso] = useState(false); // Nuevo estado para indicar envío exitoso

  const handleClose = () => {
    setModalAbierto(false);
  };

  const enviarMail = async () => {
    const userEmail = userEnteredMail;

    if (userEmail) {
      const verificationCode = generateVerificationCode();
      sendVerificationEmail(userEmail, verificationCode);

      setCodigoVerificacion(verificationCode);
      setEnvioCorreoExitoso(true); // Marca el envío exitoso para aplicar el estilo verde agua
    } else {
      alert('Ingreso de correo electrónico cancelado. La compra se cancelará.');
    }
  };

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationEmail = async (email, code) => {
    await axios.post('http://localhost:8080/isidrabit/enviar-correo-verificacion', { email, code });
  };

  const handleSubmit = () => {
    if (userEnteredCode === codigoVerificacion) {
      setMailValidado(true);
      setValidacionExitosa(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } else {
      alert('Código incorrecto');
    }
  };

  return (
    <Modal show={modalAbierto} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{validacionExitosa ? 'Validación Exitosa' : 'Verificación de Email'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {validacionExitosa ? (
          <Alert variant="success">
            <p>¡Tu correo electrónico ha sido validado con éxito! Puedes proseguir con la compra.</p>
            <img src="\src\assets\checked.png" alt="Checked" />
          </Alert>
        ) : (
          <Form className='modal-mail'>
            <div className='from-group'>
              <Form.Group controlId="formBasicCode">
                <Form.Label>Tu Email</Form.Label>
                <Form.Control
                  className={`input-mail-modal ${envioCorreoExitoso ? 'input-mail-modal-success' : ''}`}
                  type="text"
                  placeholder="Ingresa tu Email"
                  value={userEnteredMail}
                  onChange={(e) => setUserEnteredMail(e.target.value)}
                />
              </Form.Group>
              <Button className='mail-boton' onClick={enviarMail}>Enviar Código</Button>
            </div>
            <div className='from-group'>
              <Form.Group controlId="formBasicCode">
                <Form.Label>Código de Verificación</Form.Label>
                <Form.Control
                  className='input-mail-modal'
                  type="text"
                  placeholder="Ingresa el código"
                  value={userEnteredCode}
                  onChange={(e) => setUserEnteredCode(e.target.value)}
                />
              </Form.Group>
              <Button className='mail-boton' onClick={handleSubmit}>Validar Email</Button>
            </div>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MailModal;