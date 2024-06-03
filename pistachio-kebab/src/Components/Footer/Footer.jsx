import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Footer.css';
import { FormSubmitButton } from '../Home/Home';
import Swal from 'sweetalert2';
import OrderContext from '../Order/OrderContext';

export function Footer({ toggleAccessibleMode }) {
  const navigate = useNavigate();
  const { clearOrder } = useContext(OrderContext);

  const handleCancelClick = () => {
    Swal.fire({
      title: '¿Cancelar Pedido?',
      text: '¿Está seguro de que desea cancelar su pedido?',
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Sí',
      confirmButtonColor: 'green',
      showDenyButton: true,
      denyButtonText: 'No',
    }).then(response => {
      if (response.isConfirmed) {
        clearOrder();
        navigate('/');
      }
    });
  };

  const handleAccessibilityClick = () => {
    toggleAccessibleMode(); // Esta función se llama cuando se hace clic en el botón de accesibilidad
  };

  return (
    <div className="footer">
      <FormSubmitButton
        text="Cancelar Pedido"
        className="form-submit-button-2"
        onClick={handleCancelClick}
      />
      <button
        className="form-acces-button"
        onClick={handleAccessibilityClick} // Aquí se asegura de que se llame a la función handleAccessibilityClick cuando se hace clic en el botón
      >
        Accesibilidad
      </button>
    </div>
  );
};
