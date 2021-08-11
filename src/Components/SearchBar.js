import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../Context/AppContext';

function SearchBar() {
  const { setFilter, filter, setDropFilter } = useContext(AppContext);
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
    setFilter({ ...filter,
      filterByNumericValues: [...filter.filterByNumericValues, buttonSettings],
    });
  };

  const comparisonDrop = [
    'maior que',
    'menor que',
    'igual a',
  ];

  const removeFilter = ({ target: { parentElement } }) => {
    setFilter({
      ...filter,
      filterByNumericValues: filter.filterByNumericValues.filter(
        (filterColumn) => filterColumn.column !== parentElement.id,
      ),
    });
    setListDrop([...listDrop, parentElement.id]);
    setDropFilter([]);
  };

  const renderButtons = (filtered, index) => (
    <li data-testid="filter" key={ index } id={ filtered.column }>
      {filtered.column}
      <button type="button" onClick={ removeFilter }>X</button>
    </li>
  );

  useEffect(() => {
    const removeListDrop = () => {
      filter.filterByNumericValues.map((list) => {
        const newListDrop = listDrop.filter((item) => (
          item !== list.column));
        return setListDrop(newListDrop);
      });
    };
    if (filter.filterByNumericValues.length > 0) {
      removeListDrop();
    }
  }, [filter.filterByNumericValues]);

  return (
    <form>
      <h3>Barra de busca:</h3>
      <input
        data-testid="name-filter"
        type="text"
        name="name"
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
      <ul>
        {filter.filterByNumericValues.map((filtered, index) => (
          renderButtons(filtered, index)))}
      </ul>
    </form>
  );
}

export default SearchBar;
