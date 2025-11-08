import React from 'react';

const ProductCard = ({ product }) => {
    // Función para formatear el precio correctamente
    const formatPrice = (price) => {
        if (!price && price !== 0) return 'Precio no disponible';
        
        // Convertir a número si es string
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        
        // Verificar que sea un número válido
        if (isNaN(numPrice)) return 'Precio no válido';
        
        // Formatear con separadores de miles
        return new Intl.NumberFormat('es-EC', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(numPrice);
    };

    // Función para obtener el texto de condición
    const getConditionText = (condition) => {
        switch(condition) {
            case 'new': return 'Nueva';
            case 'used': return 'Usada';
            default: return condition;
        }
    };

    const [expanded, setExpanded] = React.useState(false);

    return (
        <div className="product-card">
            <div className="product-image-container">
                {product.imageUrl && (
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="product-image"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x200/cccccc/666666?text=Sin+Imagen';
                        }}
                    />
                )}
                {product.isOffer && (
                    <span className="offer-badge">¡OFERTA!</span>
                )}
            </div>

            <div className="product-content">
                <h3 className="product-name">{product.name || 'Nombre no disponible'}</h3>

                <div className="product-details">
                    <p className="product-brand">
                        <strong>Marca:</strong> {product.brand || 'No especificada'}
                    </p>
                    <p className="product-category">
                        <strong>Categoría:</strong> {product.category || 'No especificada'}
                    </p>
                    <span className={`product-condition condition-${product.condition}`}>
                        {getConditionText(product.condition)}
                    </span>
                </div>
                    <div className="product-description-section">
                    <div
                        className={`product-description-expand${expanded ? ' expanded' : ''}`}
                        style={{
                            maxHeight: expanded ? '500px' : '48px',
                            overflow: 'hidden',
                            transition: 'max-height 0.3s ease',
                        }}
                    >
                        {expanded
                            ? product.description
                            : (product.description.length > 120
                                ? `${product.description.substring(0, 120)}...`
                                : product.description)
                        }
                    </div>
                    {product.description.length > 120 && (
                        <button
                            className="product-see-more-btn"
                            style={{
                                background: '#eee',
                                color: 'var(--primary-celeste)',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '2px 10px',
                                fontSize: '0.85em',
                                marginTop: '6px',
                                marginBottom: '6px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                display: 'inline-block',
                            }}
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? 'ver menos' : 'ver más'}
                        </button>
                    )}
                </div>
            </div>
                        <div className="product-price-section">
                    <button
                        className="product-whatsapp-button"
                        onClick={() => {
                            const phone = '593994121786'; // Reemplaza por el número real
                            const message = encodeURIComponent(`Hola, estoy interesado en la máquina: ${product.name}`);
                            window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
                        }}
                    >
                        Me interesa
                    </button>
                </div>

        </div>
    );
};

export default ProductCard;