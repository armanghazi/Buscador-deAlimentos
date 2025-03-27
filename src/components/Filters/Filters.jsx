import React from 'react';
import './Filters.styles.css';

const Filters = ({
  novaFilter,
  onNovaChange,
  nutriScoreFilter,
  onNutriScoreChange,
  ecoScoreFilter,
  onEcoScoreChange,
  onFilterClick
}) => {
  return (
    <div className="filters-container">
      <div className="filter-group">
        <h3 className="filter-title">Clasificación NOVA</h3>
        <p className="filter-description">
          NOVA clasifica los alimentos según su grado de procesamiento:
          1: Sin procesar, 
          2: Ingredientes culinarios,
          3: Procesados,
          4: Ultra-procesados
        </p>
        <select
          value={novaFilter}
          onChange={(e) => onNovaChange(e.target.value)}
          className="filter-select"
        >
          <option value="">Todos</option>
          <option value="1">1 - Sin procesar</option>
          <option value="2">2 - Ingredientes culinarios</option>
          <option value="3">3 - Procesados</option>
          <option value="4">4 - Ultra-procesados</option>
        </select>
      </div>

      <div className="filter-group">
        <h3 className="filter-title">Nutri-Score</h3>
        <p className="filter-description">
          Sistema de etiquetado nutricional:
          A: Excelente calidad nutricional,
          B: Buena calidad,
          C: Calidad media,
          D: Baja calidad,
          E: Calidad muy baja
        </p>
        <select
          value={nutriScoreFilter}
          onChange={(e) => onNutriScoreChange(e.target.value)}
          className="filter-select"
        >
          <option value="">Todos</option>
          <option value="a">A - Excelente calidad nutricional</option>
          <option value="b">B - Buena calidad nutricional</option>
          <option value="c">C - Calidad nutricional media</option>
          <option value="d">D - Baja calidad nutricional</option>
          <option value="e">E - Calidad nutricional muy baja</option>
        </select>
      </div>

      <div className="filter-group">
        <h3 className="filter-title">Eco-Score</h3>
        <p className="filter-description">
          Impacto ambiental del producto:
          A: Impacto muy bajo,
          B: Impacto bajo,
          C: Impacto medio,
          D: Impacto alto,
          E: Impacto muy alto
        </p>
        <select
          value={ecoScoreFilter}
          onChange={(e) => onEcoScoreChange(e.target.value)}
          className="filter-select"
        >
          <option value="">Todos</option>
          <option value="a">A - Impacto ambiental muy bajo</option>
          <option value="b">B - Impacto ambiental bajo</option>
          <option value="c">C - Impacto ambiental medio</option>
          <option value="d">D - Impacto ambiental alto</option>
          <option value="e">E - Impacto ambiental muy alto</option>
        </select>
      </div>

      <div className="filter-button-container">
        <button 
          onClick={onFilterClick}
          className="filter-button"
        >
          Filtrar Productos
        </button>
      </div>
    </div>
  );
};

export default Filters; 