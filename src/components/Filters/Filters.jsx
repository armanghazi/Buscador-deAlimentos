import React from 'react';
import './Filters.styles.css';

const filterOptions = {
  nova: [
    { value: '1', label: '1 - Sin procesar' },
    { value: '2', label: '2 - Ingredientes culinarios' },
    { value: '3', label: '3 - Procesados' },
    { value: '4', label: '4 - Ultra-procesados' }
  ],
  nutriScore: [
    { value: 'a', label: 'A - Excelente calidad nutricional' },
    { value: 'b', label: 'B - Buena calidad nutricional' },
    { value: 'c', label: 'C - Calidad nutricional media' },
    { value: 'd', label: 'D - Baja calidad nutricional' },
    { value: 'e', label: 'E - Calidad nutricional muy baja' }
  ],
  ecoScore: [
    { value: 'a', label: 'A - Impacto ambiental muy bajo' },
    { value: 'b', label: 'B - Impacto ambiental bajo' },
    { value: 'c', label: 'C - Impacto ambiental medio' },
    { value: 'd', label: 'D - Impacto ambiental alto' },
    { value: 'e', label: 'E - Impacto ambiental muy alto' }
  ]
};

const FilterGroup = ({ title, description, value, onChange, options }) => (
  <div className="filter-group">
    <h3 className="filter-title">{title}</h3>
    <p className="filter-description">{description}</p>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="filter-select">
      <option value="">Todos</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

const Filters = ({ novaFilter, onNovaChange, nutriScoreFilter, onNutriScoreChange, ecoScoreFilter, onEcoScoreChange, onFilterClick }) => (
  <div className="filters-container">
    <FilterGroup 
      title="Clasificación NOVA"
      description="Clasifica según su grado de procesamiento:"
      value={novaFilter}
      onChange={onNovaChange}
      options={filterOptions.nova}
    />
    <FilterGroup 
      title="Nutri-Score"
      description="Sistema de etiquetado nutricional:"
      value={nutriScoreFilter}
      onChange={onNutriScoreChange}
      options={filterOptions.nutriScore}
    />
    <FilterGroup 
      title="Eco-Score"
      description="Impacto ambiental del producto:"
      value={ecoScoreFilter}
      onChange={onEcoScoreChange}
      options={filterOptions.ecoScore}
    />
    <div className="filter-button-container">
      <button onClick={onFilterClick} className="filter-button">Filtrar Productos</button>
    </div>
  </div>
);

export default Filters;