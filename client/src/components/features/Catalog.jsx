import React, { useState, useEffect } from 'react';
import FilterPanel from './FilterPanel';
import ProductCard from '../common/ProductCard';
import { fetchNewMachinery, fetchUsedMachinery } from '../../services/api';

const Catalog = () => {
    const [machinery, setMachinery] = useState([]);
    const [isNew, setIsNew] = useState(true);
    const [filters, setFilters] = useState({ category: '', brand: '' });

    useEffect(() => {
        const fetchMachinery = async () => {
            const data = isNew ? await fetchNewMachinery() : await fetchUsedMachinery();
            setMachinery(data);
        };
        fetchMachinery();
    }, [isNew]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const filteredMachinery = machinery.filter(item => {
        return (
            (filters.category ? item.category === filters.category : true) &&
            (filters.brand ? item.brand === filters.brand : true)
        );
    });

    return (
        <div>
            <h1>Catalog</h1>
            <button onClick={() => setIsNew(true)}>New Machinery</button>
            <button onClick={() => setIsNew(false)}>Used Machinery</button>
            <FilterPanel onFilterChange={handleFilterChange} />
            <div className="product-grid">
                {filteredMachinery.map(item => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </div>
    );
};

export default Catalog;