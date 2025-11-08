import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import { fetchOffers } from '../services/api';
import WhatsAppButton from '../components/common/WhatsAppButton';
const Home = () => {
    const [featuredOffers, setFeaturedOffers] = useState([]);
    const [loadingOffers, setLoadingOffers] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false); // Para pausar en hover
    const sliderRef = useRef(null);
    const autoSlideRef = useRef(null);

    const slides = [
        {
            id: 1,
            title: "Venta de maquinaria industrial nueva y segunda mano",
            description: "Encuentra la maquinaria que necesitas para hacer crecer tu negocio. Calidad garantizada y precios competitivos.",
            backgroundImage: "/src/assets/images/h1.jpg"
        },
        {
            id: 2,
            title: "METALMECÁNICA - PLÁSTICA - MADERERA",
            description: "Más de mil productos, repuestos e insumos para toda la línea industrial",
            backgroundImage: "/src/assets/images/h1.png"
        }
    ];

    // Función para iniciar el auto-slide
    const startAutoSlide = () => {
        if (autoSlideRef.current) {
            clearInterval(autoSlideRef.current);
        }
        
        autoSlideRef.current = setInterval(() => {
            if (!isPaused && !isTransitioning) {
                setCurrentSlide(prevSlide => {
                    const newSlide = prevSlide === slides.length - 1 ? 0 : prevSlide + 1;
                    scrollToSlide(newSlide);
                    return newSlide;
                });
            }
        }, 4000); // Cambiar cada 4 segundos
    };

    // Función para detener el auto-slide
    const stopAutoSlide = () => {
        if (autoSlideRef.current) {
            clearInterval(autoSlideRef.current);
        }
    };

    // Efecto para manejar el auto-slide
    useEffect(() => {
        startAutoSlide();

        // Limpiar el interval cuando el componente se desmonte
        return () => {
            stopAutoSlide();
        };
    }, [isPaused, isTransitioning]); // Reiniciar cuando cambie isPaused o isTransitioning

    useEffect(() => {
        const loadFeaturedOffers = async () => {
            try {
                const offers = await fetchOffers();
                setFeaturedOffers(offers.slice(0, 3));
            } catch (error) {
                console.error('Error fetching featured offers:', error);
            } finally {
                setLoadingOffers(false);
            }
        };

        loadFeaturedOffers();
    }, []);

    const nextSlide = () => {
        if (isTransitioning) return;
        
        // Pausar temporalmente el auto-slide cuando el usuario interactúa
        stopAutoSlide();
        
        const newSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(newSlide);
        scrollToSlide(newSlide);
        
        // Reiniciar el auto-slide después de 5 segundos
        setTimeout(() => {
            startAutoSlide();
        }, 5000);
    };

    const prevSlide = () => {
        if (isTransitioning) return;
        
        // Pausar temporalmente el auto-slide cuando el usuario interactúa
        stopAutoSlide();
        
        const newSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        setCurrentSlide(newSlide);
        scrollToSlide(newSlide);
        
        // Reiniciar el auto-slide después de 5 segundos
        setTimeout(() => {
            startAutoSlide();
        }, 5000);
    };

    const scrollToSlide = (slideIndex) => {
        if (sliderRef.current && !isTransitioning) {
            setIsTransitioning(true);
            
            // Resetear las animaciones de los slides actuales
            const allSlides = sliderRef.current.querySelectorAll('.slide');
            allSlides.forEach(slide => {
                const content = slide.querySelector('.slide-content');
                if (content) {
                    content.style.animation = 'none';
                    content.offsetHeight; // Forzar reflow
                }
            });

            // Hacer el scroll
            const slideWidth = sliderRef.current.offsetWidth;
            sliderRef.current.scrollTo({
                left: slideWidth * slideIndex,
                behavior: 'smooth'
            });

            // Después del scroll, reactivar las animaciones
            setTimeout(() => {
                const activeSlide = allSlides[slideIndex];
                if (activeSlide) {
                    const content = activeSlide.querySelector('.slide-content');
                    const title = activeSlide.querySelector('h1');
                    const description = activeSlide.querySelector('p');
                    
                    if (content) {
                        content.style.animation = 'slideContentFadeIn 0.8s ease-out forwards';
                    }
                    if (title) {
                        title.style.animation = 'fadeInUp 1s ease-out 0.2s forwards';
                    }
                    if (description) {
                        description.style.animation = 'fadeInUp 1s ease-out 0.4s forwards';
                    }
                }
                setIsTransitioning(false);
            }, 300);
        }
    };

    const goToSlide = (slideIndex) => {
        if (isTransitioning || slideIndex === currentSlide) return;
        
        // Pausar temporalmente el auto-slide cuando el usuario interactúa
        stopAutoSlide();
        
        setCurrentSlide(slideIndex);
        scrollToSlide(slideIndex);
        
        // Reiniciar el auto-slide después de 5 segundos
        setTimeout(() => {
            startAutoSlide();
        }, 5000);
    };

    // Pausar auto-slide en hover
    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    return (
        <div>
            <header 
                className="home-header-slider"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="slider-container" ref={sliderRef}>
                    {slides.map((slide, index) => (
                        <div 
                            key={slide.id} 
                            className={`slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                        >
                            <div className="slide-overlay"></div>
                            <div className="slide-content">
                                <h1>{slide.title}</h1>
                                <p>{slide.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="slider-controls">
                    <button 
                        className="slider-btn slider-btn-prev"
                        onClick={prevSlide}
                        disabled={isTransitioning}
                        aria-label="Anterior"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    
                    <button 
                        className="slider-btn slider-btn-next"
                        onClick={nextSlide}
                        disabled={isTransitioning}
                        aria-label="Siguiente"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                <div className="slider-indicators">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            disabled={isTransitioning}
                        ></button>
                    ))}
                </div>

                {/* Indicador de progreso opcional */}
                <div className="slide-progress">
                    <div 
                        className={`progress-bar ${!isPaused && !isTransitioning ? 'active' : ''}`}
                        key={currentSlide} // Reiniciar animación en cada slide
                    ></div>
                </div>
            </header>

            <section className="home-banner">
                <h2>Nuestros servicios incluyen</h2>
                <ul className="services-list">
                    <li>Servicio Técnico</li>
                    <li>Asesoría</li>
                    <li>Seguridad</li>
                </ul>
            </section>

            <section className="home-intro">
                <h2>Explora Nuestro Catálogo</h2>
                <p>Descubre maquinaria nueva y de segunda mano, así como ofertas especiales diseñadas para satisfacer todas tus necesidades industriales.</p>
                
                <div className="home-buttons">
                    <Link to="/new-machinery" className="btn">Ver Maquinaria Nueva</Link>
                    <Link to="/used-machinery" className="btn">Ver Segunda Mano</Link>
                    <Link to="/offers" className="btn">Ofertas Especiales</Link>
                </div>
            </section>

            <section className="featured-offers">
                <div className="section-header">
                    <h2>Ofertas Destacadas</h2>
                    <p>No te pierdas estas increíbles ofertas por tiempo limitado</p>
                    <Link to="/offers" className="view-all-btn">Ver Todas las Ofertas</Link>
                </div>
                
                <div className="featured-offers-grid">
                    {loadingOffers ? (
                        <div className="loading">Cargando ofertas...</div>
                    ) : featuredOffers.length > 0 ? (
                        featuredOffers.map((offer) => (
                            <div key={offer.id} className="featured-offer-card">
                                <ProductCard product={offer} />
                            </div>
                        ))
                    ) : (
                        <div className="no-offers">
                            <p>No hay ofertas disponibles en este momento.</p>
                            <Link to="/new-machinery" className="btn">Ver Maquinaria Nueva</Link>
                        </div>
                    )}
                </div>
            </section>

            <section className="location-section" style={{ position: 'relative' }}>
                <div className="location-container">
                    <div className="location-info">
                        <h2>Nuestra Ubicación</h2>
                        <div className="address-card">
                            <div className="address-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                                </svg>
                            </div>
                            <div className="address-details">
                                <h3>Dirección</h3>
                                <p>KM 10.5 VIA DAULE, LOTIZACION INMACONSA</p>
                                <p>JUNTO A FABRICA SUMESA</p>
                                <p>Guayaquil, Ecuador</p>
                            </div>
                        </div>
                        
                        <div className="contact-info">
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4>Teléfono</h4>
                                    <p>+593 99-412-1786</p>
                                </div>
                            </div>
                            
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4>Email</h4>
                                    <p>maquinaria@maquindust.com</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="business-hours">
                            <h4>Horarios de Atención</h4>
                            <div className="hours-grid">
                                <span>Lunes - Viernes:</span>
                                <span>8:00 AM - 6:00 PM</span>
                                <span>Sábados:</span>
                                <span>8:00 AM - 2:00 PM</span>
                                <span>Domingos:</span>
                                <span>Cerrado</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="map-container">
                        <h3>Encuéntranos aquí</h3>
                        <div className="map-embed">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.7234567890123!2d-79.9369668127249!3d-2.110530945889995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d13a7b9d5c4f7%3A0x0!2zMsKwMDYnMzcuOSJTIDc5wrA1NicxMy4xIlc!5e0!3m2!1ses!2sec!4v1734567890123!5m2!1ses!2sec"
                                width="100%" 
                                height="300" 
                                style={{border: 0, borderRadius: '12px'}} 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicación de la empresa"
                            ></iframe>
                        </div>
                        <Link to="/about" className="contact-btn">
                            Contáctanos
                        </Link>
                    </div>
                </div>
                <WhatsAppButton />
            </section>
        </div>
    );
};

export default Home;