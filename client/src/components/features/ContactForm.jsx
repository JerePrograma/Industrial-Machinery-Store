import React, { useState } from 'react';
import { submitContact } from '../../services/api';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contactData = { name, email, phone, message };

        try {
            await submitContactForm(contactData);
            alert('Your information has been submitted successfully!');
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting your information. Please try again.');
        }
    };

    return (
        <div className="contact-form">
            <h2>Vende tu maquinaria</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Teléfono:</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message">Mensaje:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default ContactForm;