import React from 'react';
import logoHeller from '../assets/icons/logo_hellermaquinaria.avif';
import logoFollow from '../assets/icons/logo-follow.png';
import logoHelfer from '../assets/icons/logo-helfer.svg';

const About = () => {
    return (
        <div className="about">
            <header className="about-header">
                <h1>Quiénes Somos</h1>
                <p>Líderes en maquinaria industrial con más de 15 años de experiencia en el mercado ecuatoriano</p>
            </header>

            <div className="about-content">
                <div className="about-grid">
                    <div className="about-text">
                        <h2>Nuestra Historia</h2>
                        <p>
                            Fundada en 2009, <strong>Maquinaria Industrial del Guayas</strong> nació con la visión de 
                            proporcionar soluciones integrales en maquinaria industrial para empresas de todos los 
                            tamaños en Ecuador.
                        </p>
                        <p>
                            Comenzamos como una pequeña empresa familiar y hemos crecido hasta convertirnos en 
                            uno de los distribuidores más confiables de maquinaria nueva y usada en la región, 
                            especializándonos en los sectores <strong>metalmecánico, plástico y maderero</strong>.
                        </p>
                        <p>
                            Con más de <strong>mil productos, repuestos e insumos</strong> disponibles, 
                            nuestro compromiso con la calidad, el servicio excepcional y precios competitivos 
                            nos ha permitido construir relaciones duraderas con nuestros clientes.
                        </p>
                    </div>

                    <div className="about-stats">
                        <div className="stat-grid">
                            <div className="stat-box">
                                <span className="number">15+</span>
                                <span className="label">Años de Experiencia</span>
                            </div>
                            <div className="stat-box">
                                <span className="number">1000+</span>
                                <span className="label">Productos Disponibles</span>
                            </div>
                            <div className="stat-box">
                                <span className="number">500+</span>
                                <span className="label">Clientes Satisfechos</span>
                            </div>
                            <div className="stat-box">
                                <span className="number">24/7</span>
                                <span className="label">Soporte Técnico</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mission-vision">
                    <div className="mission-card">
                        <h3>Nuestra Misión</h3>
                        <p>
                            Proporcionar maquinaria industrial de alta calidad para los sectores metalmecánico, 
                            plástico y maderero, acompañada de más de mil productos, repuestos e insumos, 
                            con servicio técnico especializado y asesoría personalizada.
                        </p>
                    </div>

                    <div className="vision-card">
                        <h3>Nuestra Visión</h3>
                        <p>
                            Ser la empresa líder en Ecuador en la comercialización de maquinaria y suministros 
                            industriales, reconocida por nuestra excelencia en servicio, innovación tecnológica 
                            y compromiso con el desarrollo industrial del país.
                        </p>
                    </div>
                </div>

                {/* Sección de Socios Estratégicos */}
                <div className="partners-section">
                    <h2>Nuestros Socios Estratégicos</h2>
                    <p className="partners-intro">
                        Representamos a las marcas más prestigiosas de la industria mundial, 
                        garantizando calidad y confiabilidad en cada producto.
                    </p>
                    
                    <div className="partners-grid">
                        <div className="partner-card">
                            <div className="partner-logo">
                                <img src={logoHeller} alt="Heller Maquinaria" />
                                <span className="partner-flag">🇩🇪</span>
                            </div>
                            <div className="partner-info">
                                <h4>Heller Maquinaria</h4>
                                <p>Líder mundial en maquinaria de precisión para metalmecánica. 
                                Tecnología alemana de vanguardia para fresadoras, tornos y centros de mecanizado.</p>
                                <div className="partner-specialties">
                                    <span>Fresadoras CNC</span>
                                    <span>Tornos Industriales</span>
                                    <span>Centros de Mecanizado</span>
                                </div>
                            </div>
                        </div>

                        <div className="partner-card">
                            <div className="partner-logo">
                                <img src={logoFollow} alt="Follow Machines" />
                                <span className="partner-flag">🇲🇽</span>
                            </div>
                            <div className="partner-info">
                                <h4>Follow Machines</h4>
                                <p>Innovación mexicana en maquinaria industrial para múltiples sectores. 
                                Especialistas en equipos para plásticos, metal y automatización.</p>
                                <div className="partner-specialties">
                                    <span>Inyectoras de Plástico</span>
                                    <span>Extrusoras</span>
                                    <span>Automatización</span>
                                </div>
                            </div>
                        </div>

                        <div className="partner-card">
                            <div className="partner-logo">
                                <img src={logoHelfer} alt="Helfer Industrial" />
                                <span className="partner-flag">🇧🇷</span>
                            </div>
                            <div className="partner-info">
                                <h4>Helfer Industrial</h4>
                                <p>Excelencia brasileña en equipos industriales pesados. 
                                Prensas hidráulicas, compresores y maquinaria para la industria maderera.</p>
                                <div className="partner-specialties">
                                    <span>Prensas Hidráulicas</span>
                                    <span>Compresores</span>
                                    <span>Maquinaria Maderera</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="partners-cta">
                        <p>¿Quieres conocer más sobre nuestros socios estratégicos y sus productos?</p>
                        <div className="partners-links">
                            <a href="https://hellermaquinaria.com/" target="_blank" rel="noopener noreferrer" className="partner-link">
                                Visitar Heller
                            </a>
                            <a href="https://www.followmachines.com/mx/" target="_blank" rel="noopener noreferrer" className="partner-link">
                                Visitar Follow Machines
                            </a>
                            <a href="https://helferindustrial.com/" target="_blank" rel="noopener noreferrer" className="partner-link">
                                Visitar Helfer Industrial
                            </a>
                        </div>
                    </div>
                </div>

                <div className="about-text">
                    <h2>¿Por Qué Elegirnos?</h2>
                    <p>
                        <strong>✅ Experiencia Comprobada:</strong> Más de 15 años respaldando a la industria ecuatoriana 
                        con soluciones de maquinaria confiables y eficientes para metalmecánica, plástica y maderera.
                    </p>
                    <p>
                        <strong>✅ Inventario Extenso:</strong> Más de mil productos, repuestos e insumos disponibles 
                        para todas tus necesidades industriales.
                    </p>
                    <p>
                        <strong>✅ Socios de Prestigio:</strong> Representamos marcas reconocidas mundialmente como 
                        Heller, Follow Machines y Helfer Industrial.
                    </p>
                    <p>
                        <strong>✅ Calidad Garantizada:</strong> Todas nuestras máquinas pasan por rigurosas inspecciones 
                        técnicas antes de ser puestas a la venta.
                    </p>
                    <p>
                        <strong>✅ Servicio Integral:</strong> No solo vendemos maquinaria, también ofrecemos 
                        mantenimiento, repuestos y asesoría técnica especializada 24/7.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;