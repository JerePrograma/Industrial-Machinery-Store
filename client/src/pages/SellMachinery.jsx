import React from 'react';
import ContactForm from '../components/features/ContactForm';

const SellMachinery = () => {
    return (
        <div className="sell-machinery">
            <header className="sell-header">
                <h1>💰 Vende tu Maquinaria</h1>
                <p>¿Tienes maquinaria que ya no usas? Nosotros te ayudamos a venderla al mejor precio del mercado</p>
            </header>
            
            <ContactForm />
        </div>
    );
};

export default SellMachinery;