import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Footer.css';
import { FormSubmitButton } from '../Home/Home';
import { FormSubmitButtonAcces } from '../Home/Home';
import Swal from 'sweetalert2';
import OrderContext from '../Order/OrderContext';

export function Footer() {
  const navigate = useNavigate();
  const { clearOrder } = useContext(OrderContext);

  const handleCancelClick = () => {
    const confirmed =
      Swal.fire({
        title: '¿Cancelar Pedido?', 
        text: '¿Está seguro de que desea cancelar su pedido?',
        icon: 'question',
        showConfirmButton: true,
        confirmButtonText: 'Sí',
        confirmButtonColor: 'green',
        showDenyButton: true,
        denyButtonText: 'No',
      })
      .then(response => {
        if(response.isConfirmed){
          clearOrder();
          navigate('/');
        }
      });
  };

  return (
    <div className="footer">
        <FormSubmitButton
          text="Cancelar Pedido"
          className="form-submit-button-2"
          onClick={handleCancelClick}
        />
        <FormSubmitButtonAcces
          text="Accesibilidad"
          className="form-acces-button"
        />
    </div> 
  );
};