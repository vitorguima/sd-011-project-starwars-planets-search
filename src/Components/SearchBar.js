import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../Context/AppContext';

function SearchBar() {
  const { setFilter, filter } = useContext(AppContext);
  const [listDrop, setListDrop] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [buttonSettings, setButtonSettings] = useState(
    {
      column: 'population',
      comparison: 'maior que',
      value: 0,
    },
  );

  const handleSerachBar = ({ target: { name, value } }) => {
    setFilter({
      ...filter,
      filterByName: { ...filter.filterByName, [name]: value },

    });
  };

  const handleFilterValues = ({ target: { value, name } }) => {
    setButtonSettings({
      ...buttonSettings,
      [name]: value,
    });
  };

  const handleSelects = () => {
    setFilter({
      ...filter,
      filterByNumericValues: { ...filter.filterByNumericValues, ...buttonSettings },

    });
  };

  const comparisonDrop = [
    'maior que',
    'menor que',
    'igual a',
  ];
  useEffect(() => {
    const removeListDrop = () => {
      const newListDrop = listDrop.filter((item) => (
        item !== filter.filterByNumericValues.column));
      setListDrop(newListDrop);
    };
    removeListDrop();
  }, [filter.filterByNumericValues.column]);

  return (
    <form>
      <h3>Barra de busca:</h3>
      <input
        data-testid="name-filter"
        type="text"
        name="name"
        // value={ filter.filterByName }
        onChange={ handleSerachBar }
      />
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleFilterValues }
      >
        {listDrop.map((drop, index) => (<option key={ index }>{drop}</option>))}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleFilterValues }
      >
        {comparisonDrop.map((drop, index) => (<option key={ index }>{drop}</option>))}
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="value"
        onChange={ handleFilterValues }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleSelects }
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
