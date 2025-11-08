import React, { useEffect, useState } from 'react';
import ProductCard from '../components/common/ProductCard';
import SearchFilter from '../components/common/SearchFilter';
import { fetchOffers } from '../services/api';

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [filteredOffers, setFilteredOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ category: '', brand: '' });
    const [selectedCondition, setSelectedCondition] = useState('');


    useEffect(() => {
        const loadOffers = async () => {
            try {
                setLoading(true);
                const data = await fetchOffers();
                setOffers(data);
                setFilteredOffers(data);
            } catch (error) {
                console.error('Error fetching offers:', error);
            } finally {
                setLoading(false);
            }
        };

        loadOffers();
    }, []);

    // Filtrar ofertas
    useEffect(() => {
        let filtered = offers;

        if (searchTerm) {
            filtered = filtered.filter(offer =>
                offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                offer.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                offer.subCategory.toLowerCase().includes(searchTerm.toLowerCase()) 
            );
        }

        if (filters.category) {
            filtered = filtered.filter(offer => offer.category === filters.category);
        }

        if (filters.subCategory) {
            filtered = filtered.filter(offer => offer.subCategory === filters.subCategory);
        }

        if (filters.brand) {
            filtered = filtered.filter(offer => offer.brand === filters.brand);
        }

        if (selectedCondition) {
            filtered = filtered.filter(offer => offer.condition === selectedCondition);
        }

        setFilteredOffers(filtered);
    }, [offers, searchTerm, filters, selectedCondition]);

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };


    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedSubCategory('');
        setSelectedBrand('');
        setSelectedCondition('');
    };

    return (
        <div className="offers-page">
            {/* Header de Ofertas */}
            <header className="offers-header">
                <div className="offers-header-content">
                    <h1>🔥 Ofertas Especiales</h1>
                    <p>Aprovecha estos precios únicos por tiempo limitado. ¡Las mejores máquinas industriales al mejor precio!</p>
                    <div className="offers-stats">
                        <div className="stat-item">
                            <span className="stat-number">{offers.length}</span>
                            <span className="stat-label">Ofertas Disponibles</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">30%</span>
                            <span className="stat-label">Descuento Promedio</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Filtros de búsqueda */}
             <SearchFilter 
                onSearchChange={handleSearchChange}
                onFilterChange={handleFilterChange}
            />

            {/* Grid de ofertas */}
            <section className="offers-grid-section">
                <div className="offers-container">
                    {loading ? (
                        <div className="loading">Cargando ofertas increíbles...</div>
                    ) : filteredOffers.length > 0 ? (
                        <>
                            <div className="results-info">
                                <p>Se encontraron <strong>{filteredOffers.length}</strong> ofertas especiales</p>
                            </div>
                            <div className="offers-grid">
                                {filteredOffers.length > 0 ? (
                                    filteredOffers.map(offer => (
                                        <ProductCard key={offer.id} product={offer} />
                                    ))
                                ) : null}
                            </div>
                        </>
                    ) : (
                        <div className="no-offers">
                            <div className="no-offers-icon">🔍</div>
                            <h3>No se encontraron ofertas</h3>
                            <p>No hay ofertas que coincidan con los filtros seleccionados.</p>
                            <button className="clear-filters" onClick={clearFilters}>
                                Ver todas las ofertas
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Offers;