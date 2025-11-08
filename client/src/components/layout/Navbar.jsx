import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg';

const Navbar = () => {
    const [showCatalogDropdown, setShowCatalogDropdown] = useState(false);
    const dropdownTimeout = useRef(null);
    
    const handleMouseEnter = () => {
        // Limpiar cualquier timeout pendiente
        if (dropdownTimeout.current) {
            clearTimeout(dropdownTimeout.current);
        }
        setShowCatalogDropdown(true);
    };

    const handleMouseLeave = () => {
        // Añadir un retraso antes de ocultar el dropdown
        dropdownTimeout.current = setTimeout(() => {
            setShowCatalogDropdown(false);
        }, 300); // 300ms de retraso
    };

    const handleDropdownEnter = () => {
        // Si el mouse entra al dropdown, cancelar el timeout
        if (dropdownTimeout.current) {
            clearTimeout(dropdownTimeout.current);
        }
    };

    const handleDropdownLeave = () => {
        // Ocultar inmediatamente si sale del dropdown
        setShowCatalogDropdown(false);
    };
    
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/" >
                <img src={logo} alt="Industrial Machinery Store Logo" />
                </Link>
                <h2>Maquinaria Industrial del Guayas</h2>
            </div>

            <div className="nav">
                <div className="container">
                    <Link to="/" className="btn">Home</Link>
                    
                    <div
                        className="dropdown-container"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span className="btn">
                            Catálogo
                            <svg 
                                className={`dropdown-arrow ${showCatalogDropdown ? 'rotated' : ''}`}
                                width="12" 
                                height="12" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
                            </svg>
                        </span>
                        {showCatalogDropdown && (
                            <div 
                                className="dropdown-menu"
                                onMouseEnter={handleDropdownEnter}
                                onMouseLeave={handleDropdownLeave}
                            >
                                <Link 
                                    to="/new-machinery" 
                                    className="dropdown-item" 
                                    style={{animationDelay: '0s'}}
                                    onClick={() => setShowCatalogDropdown(false)}
                                >
                                    
                                    Maquinaria Nueva
                                </Link>
                                <Link 
                                    to="/used-machinery" 
                                    className="dropdown-item" 
                                    style={{animationDelay: '0.1s'}}
                                    onClick={() => setShowCatalogDropdown(false)}
                                >
                                    
                                    Maquinaria Usada
                                </Link>
                            </div>
                        )}
                    </div>
                    
                    <Link to="/offers" className="btn offers-btn">
                        Ofertas
                    </Link>
                    <Link to="/about" className="btn">Quienes Somos</Link>
                    <Link to="/sell-machinery" className="btn sell-btn">Vende tu Maquinaria</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;