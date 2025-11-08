import React, { useEffect, useState } from 'react';
import ProductCard from '../components/common/ProductCard';
import SearchFilter from '../components/common/SearchFilter';
import { fetchNewMachinery } from '../services/api';

const NewMachinery = () => {
    const [allMachinery, setAllMachinery] = useState([]);
    const [filteredMachinery, setFilteredMachinery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ category: '', brand: '' });

    useEffect(() => {
        const loadMachinery = async () => {
            try {
                const data = await fetchNewMachinery();
                setAllMachinery(data);
                setFilteredMachinery(data);
            } catch (error) {
                console.error('Error fetching new machinery:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMachinery();
    }, []);

    useEffect(() => {
        let filtered = allMachinery;

        // Filtrar por término de búsqueda
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.subCategory.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filtrar por categoría
        if (filters.category) {
            filtered = filtered.filter(item => item.category === filters.category);
        }

        // Filtrar por marca
        if (filters.brand) {
            filtered = filtered.filter(item => item.brand === filters.brand);
        }

        if (filters.subCategory) {
            filtered = filtered.filter(item => item.subCategory === filters.subCategory);
        }

        setFilteredMachinery(filtered);
    }, [allMachinery, searchTerm, filters]);

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    if (loading) {
        return <div>Cargando maquinaria nueva...</div>;
    }

    return (
        <div>
            <div className="page-header">
                <h1>Maquinaria Nueva</h1>
                <p>Descubre nuestra selección de maquinaria industrial nueva</p>
            </div>
            
            <SearchFilter 
                onSearchChange={handleSearchChange}
                onFilterChange={handleFilterChange}
            />
            
            <div className="product-grid">
                {filteredMachinery.length > 0 ? (
                    filteredMachinery.map((machinery) => (
                        <ProductCard key={machinery.id} product={machinery} />
                    ))
                ) : (
                    <div className="no-results">
                        No se encontró maquinaria nueva que coincida con los criterios de búsqueda.
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewMachinery;