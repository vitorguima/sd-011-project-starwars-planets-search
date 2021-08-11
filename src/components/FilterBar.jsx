import React, { useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../styles/filterBar.css';

function FilterBar() {
  const {
    filters,
    setFilters,
    handleFilterByName,
    handleFilterByColumn,
    removedFilters,
  } = useContext(PlanetsContext);

  const handleChange = ({ target: { value } }) => {
    handleFilterByName(value);
  };

  const arrayOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const [fieldColumn, setFieldColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [inputValue, setInputValue] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState(arrayOptions);

  const compareFilters = () => {
    const obj = {
      fieldColumn,
      comparison,
      inputValue,
    };
    const filterSelect = filteredOptions.filter((filter) => filter !== fieldColumn);
    setFilteredOptions([...filterSelect]);
    handleFilterByColumn(obj);
    setFilters([...filters, obj]);
  };

  console.log(`estado ${filteredOptions}, array ${arrayOptions}`);

  return (
    <div>
      <div className="bar-container">
        <label htmlFor="search-name">
          <input
            type="text"
            name="search-name"
            data-testid="name-filter"
            placeholder="Pesquise pelo nome"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="filter-by-column">
          <select
            data-testid="column-filter"
            name="filter-by-column"
            onChange={ ({ target: { value } }) => setFieldColumn(value) }
          >
            { filteredOptions
              .map((option) => (
                <option
                  id={ option }
                  key={ option }
                  value={ option }
                >
                  {option}
                </option>))}

          </select>
        </label>
        <label htmlFor="filter-by-camparation">
          <select
            data-testid="comparison-filter"
            name="filter-by-comparation"
            onChange={ ({ target: { value } }) => setComparison(value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="filter-input">
          <input
            type="number"
            data-testid="value-filter"
            name="filter-input"
            onChange={ ({ target: { value } }) => setInputValue(value) }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ compareFilters }
        >
          Filtrar
        </button>
      </div>
      <div>
        { removedFilters.map((filter, index) => (
          <div key={ index } className="container-filtered">
            <p>{filter}</p>
            <button
              type="button"
              className="filter-button"
              data-testid="filter"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
