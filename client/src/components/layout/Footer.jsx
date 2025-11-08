import React from 'react';
import { Icon } from '@iconify/react';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-brand">
        <img src="/src/assets/icons/logo.svg" alt="Maquindust Logo" className="footer-logo" />
        <span>Maquindust</span>
        <div className="footer-info">
          <span>
            <Icon icon="mdi:map-marker-radius" width="22" height="22" style={{ color: '#3498db', verticalAlign: 'middle', marginRight: '7px' }} />
            Dirección: Av. Industrial 123, Quito, Ecuador
          </span>
          <span>
            <Icon icon="mdi:email-outline" width="22" height="22" style={{ color: '#25d366', verticalAlign: 'middle', marginRight: '7px' }} />
            Email: <a href="mailto:info@maquindust.com">info@maquindust.com</a>
          </span>
          <span>
            <Icon icon="mdi:phone-outline" width="22" height="22" style={{ color: '#007bff', verticalAlign: 'middle', marginRight: '7px' }} />
            Teléfono: <a href="tel:+593994121786">+593 994 121 786</a>
          </span>
          <div className="footer-social">
            <a href="https://facebook.com/maquindust" target="_blank" rel="noopener noreferrer">
              <img src="/src/assets/icons/facebook.svg" alt="Facebook" className="footer-social-icon" />
            </a>
            <a href="https://instagram.com/maquindustoficial" target="_blank" rel="noopener noreferrer">
              <img src="/src/assets/icons/instagram.svg" alt="Instagram" className="footer-social-icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-links">
        <span> Te puede interesar </span>
        <a href="/offers">Ofertas</a>
        <a href="/used-machinery">Maquinaria Usada</a>
        <a href="/new-machinery">Maquinaria Nueva</a>
        <a href="/sell-machinery">Vender Maquinaria</a>
      </div>
      <div className="footer-contact">
        <span>WhatsApp: <a href="https://wa.me/593994121786" target="_blank" rel="noopener noreferrer">+593 994 121 786</a></span>
        <span>Email: <a href="mailto:info@maquindust.com">info@maquindust.com</a></span>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© {new Date().getFullYear()} Maquindust. Todos los derechos reservados.</span>
    </div>
  </footer>
);

export default Footer;