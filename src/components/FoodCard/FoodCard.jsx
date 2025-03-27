import React from 'react';
import './FoodCard.styles.css';

const ScoreItem = ({ label, value }) => {
  // Convert value to string and handle null/undefined/unknown
  const stringValue = value ? String(value).toUpperCase() : 'DESCONOCIDO';
  
  // Get the appropriate class name based on the label and value
  const getScoreClass = () => {
    if (label === 'NOVA') {
      return `nova-${stringValue.toLowerCase()}`;
    }
    return `score-${stringValue.toLowerCase()}`;
  };
  
  return (
    <div className="score-item">
      <span className="score-label">{label}:</span>
      <span className={`score-value ${getScoreClass()}`}>
        {stringValue}
      </span>
    </div>
  );
};

const FoodCard = ({ product, isFavorite, onFavoriteClick, onDetailsClick }) => {
  const imageUrl = product.image_url || product.image_small_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPvhFBx7EVU7kjA5DGsRlvgTHde-XWJ-hkhw&s';

  return (
    <div className="food-card">
      <div className="food-card-image">
        <img src={imageUrl} alt={product.product_name} />
        <button
          className={`favorite-button ${isFavorite ? 'favorite' : ''}`}
          onClick={() => onFavoriteClick(product)}
          aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="food-card-content">
        <h3 className="food-card-title">{product.product_name}</h3>
        <div className="food-card-scores">
          <ScoreItem label="NOVA" value={product.nova_group} />
          <ScoreItem label="Nutri-Score" value={product.nutriscore_grade} />
          <ScoreItem label="Eco-Score" value={product.ecoscore_grade} />
        </div>
        <button
          className="details-button"
          onClick={() => onDetailsClick(product)}
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
