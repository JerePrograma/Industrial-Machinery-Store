import React, { useState } from 'react';

const SearchFilter = ({ onSearchChange, onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');

    // Categorías y subcategorías disponibles
    const categories = [
        'Metalmecánica', 
        'Madera', 
        'Plastico', 
        'Equipo pesado', 
        'varios'
    ];

    const metalmecanicaSubCategories = [
        'Tornos',
        'Fresadoras',
        'Plegadoras',
        'Cizallas',
        'Taladros',
        'Prensas/Troqueladoras',
        'Taladro fresador/Taladro radial',
        'Talladora de piñon',
        'Cepillos',
        'Dobladoras',
        'Perfiladoras/Rofolmer',
        'Punzonadora/tronzadora',
        'Rebobbinador de flejes',
        'Rebordeadora',
        'Remachadoras',
        'Rectificadoras',
        'Roladoras',
        'Tronzadora',
        'Sierra'
    ];

    const maderaSubCategories = [
        'Maquinas para madera',
        'Maquinas para papel',
        'Maquinas para hacer marcos'
    ];

    const plasticoSubCategories = [
        'Aglomerador',
        'Calandras para plasticos',
        'Desbobinadoras',
        'Extrusoras',
        'Impresoras para plasticos',
        'Inyectoras',
        'Maquinas para plasticos',
        'Selladoras para fundas plasticas',
        'Molinos para plastico y piedra'
    ];

    const brands = [
        'Casanova',
        'Heller',
        'Follow',
        'Helfer'
    ];

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearchChange(value);
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategory(value);
        setSelectedSubCategory('');
        onFilterChange({ category: value, brand: selectedBrand, subCategory: '' });
    };

    const handleSubCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedSubCategory(value);
        onFilterChange({ category: selectedCategory, brand: selectedBrand, subCategory: value });
    };

    const handleBrandChange = (e) => {
        const value = e.target.value;
        setSelectedBrand(value);
        onFilterChange({ category: selectedCategory, brand: value, subCategory: selectedSubCategory });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedBrand('');
        setSelectedSubCategory('');
        onSearchChange('');
        onFilterChange({ category: '', brand: '', subCategory: '' });
    };

    return (
        <div className="search-filter-container">
            <input
                type="text"
                placeholder="Buscar maquinaria..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-bar"
            />
            
            <div className="filter-panel">
                <div className="filter-group">
                    <label htmlFor="category">Categoría:</label>
                    <select 
                        id="category" 
                        value={selectedCategory} 
                        onChange={handleCategoryChange}
                    >
                        <option value="">Todas las categorías</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedCategory === 'Metalmecánica' && (
                    <div className="filter-group">
                        <label htmlFor="subCategory">Subcategoría:</label>
                        <select
                            id="subCategory"
                            value={selectedSubCategory}
                            onChange={handleSubCategoryChange}
                        >
                            <option value="">Todas las subcategorías</option>
                            {metalmecanicaSubCategories.map((subCategory) => (
                                <option key={subCategory} value={subCategory}>
                                    {subCategory}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {selectedCategory === 'Madera' && (
                    <div className="filter-group">
                        <label htmlFor="subCategory">Subcategoría:</label>
                        <select
                            id="subCategory"
                            value={selectedSubCategory}
                            onChange={handleSubCategoryChange}
                        >
                            <option value="">Todas las subcategorías</option>
                            {maderaSubCategories.map((subCategory) => (
                                <option key={subCategory} value={subCategory}>
                                    {subCategory}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                
                
                {selectedCategory === 'Plastico' && (
                    <div className="filter-group">
                        <label htmlFor="subCategory">Subcategoría:</label>
                        <select
                            id="subCategory"
                            value={selectedSubCategory}
                            onChange={handleSubCategoryChange}
                        >
                            <option value="">Todas las subcategorías</option>
                            {plasticoSubCategories.map((subCategory) => (
                                <option key={subCategory} value={subCategory}>
                                    {subCategory}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                
                <div className="filter-group">
                    <label htmlFor="brand">Marca:</label>
                    <select 
                        id="brand" 
                        value={selectedBrand} 
                        onChange={handleBrandChange}
                    >
                        <option value="">Todas las marcas</option>
                        {brands.map((brand) => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                </div>
                
                <button onClick={clearFilters} className="clear-filters">
                    Limpiar Filtros
                </button>
            </div>
        </div>
    );
};

export default SearchFilter;