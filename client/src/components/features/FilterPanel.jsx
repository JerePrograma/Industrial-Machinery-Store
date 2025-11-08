import React, { useState } from 'react';

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

const FilterPanel = ({ categories, brands, onFilterChange }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        setSelectedCategory(value);
        setSelectedSubCategory('');
        onFilterChange(value, selectedBrand, '');
    };

    const handleBrandChange = (event) => {
        const value = event.target.value;
        setSelectedBrand(value);
        onFilterChange(selectedCategory, value, selectedSubCategory);
    };

    const handleSubCategoryChange = (event) => {
        const value = event.target.value;
        setSelectedSubCategory(value);
        onFilterChange(selectedCategory, selectedBrand, value);
    };

    return (
        <div className="filter-panel">
            <h3>Filtrar por:</h3>
            <div className="filter-group">
                <label htmlFor="category">Categoría:</label>
                <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Todas</option>
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
                    <select id="subCategory" value={selectedSubCategory} onChange={handleSubCategoryChange}>
                        <option value="">Todas</option>
                        {metalmecanicaSubCategories.map((sub) => (
                            <option key={sub} value={sub}>
                                {sub}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {selectedCategory === 'Madera' && (
                <div className="filter-group">
                    <label htmlFor="subCategory">Subcategoría:</label>
                    <select id="subCategory" value={selectedSubCategory} onChange={handleSubCategoryChange}>
                        <option value="">Todas</option>
                        {maderaSubCategories.map((sub) => (
                            <option key={sub} value={sub}>
                                {sub}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {selectedCategory === 'Plastico' && (
                <div className="filter-group">
                    <label htmlFor="subCategory">Subcategoría:</label>
                    <select id="subCategory" value={selectedSubCategory} onChange={handleSubCategoryChange}>
                        <option value="">Todas</option>
                        {plasticoSubCategories.map((sub) => (
                            <option key={sub} value={sub}>
                                {sub}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <div className="filter-group">
                <label htmlFor="brand">Marca:</label>
                <select id="brand" value={selectedBrand} onChange={handleBrandChange}>
                    <option value="">Todas</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FilterPanel;