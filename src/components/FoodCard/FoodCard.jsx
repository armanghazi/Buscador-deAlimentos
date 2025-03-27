import React from 'react';
import './FoodCard.styles.css';

const FoodCard = ({
  product,
  onDetailsClick,
  onFavoriteClick,
  isFavorite
}) => {
  const {
    product_name,
    image_url,
    nutriscore_grade,
    ecoscore_grade,
    nova_group,
    quantity
  } = product;

  return (
    <div className="food-card">
      <div className="food-card-image-container">
        <img
          src={image_url}
          alt={product_name}
          className="food-card-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
          }}
        />
      </div>
      <div className="food-card-content">
        <h3 className="food-card-title">{product_name}</h3>
        <div className="food-card-scores">
          <div className="score-container">
            <span className="score-label">Nutri-Score:</span>
            <span className={`score-value ${nutriscore_grade || 'unknown'}`}>
              {nutriscore_grade ? nutriscore_grade.toUpperCase() : 'N/A'}
            </span>
          </div>
          <div className="score-container">
            <span className="score-label">Eco-Score:</span>
            <span className={`score-value ${ecoscore_grade || 'unknown'}`}>
              {ecoscore_grade ? ecoscore_grade.toUpperCase() : 'N/A'}
            </span>
          </div>
          <div className="score-container">
            <span className="score-label">NOVA:</span>
            <span className={`score-value nova-${nova_group || 'unknown'}`}>
              {nova_group || 'N/A'}
            </span>
          </div>
        </div>
        {quantity && (
          <div className="food-card-quantity">
            <span className="quantity-label">Cantidad:</span>
            <span className="quantity-value">{quantity}</span>
          </div>
        )}
        <div className="food-card-actions">
          <button
            onClick={() => onDetailsClick(product)}
            className="details-button"
          >
            Ver Detalles
          </button>
          <button
            onClick={() => onFavoriteClick(product)}
            className={`favorite-button ${isFavorite ? 'favorite-active' : ''}`}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard; 