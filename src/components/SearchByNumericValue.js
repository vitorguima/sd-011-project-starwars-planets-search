import React, { useContext, useState, useEffect } from 'react';
import TableContext from '../context/TableContext';

function SearchByNumericValue() {
  const { addFilterOnList, filters } = useContext(TableContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('100000');
  const [columnNames, setColumnNames] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [filteredColumn, setFilteredColumn] = useState([...columnNames]);
  const { filterByNumericValues } = filters;

  const removeColumnOption = () => {
    let currentColumn = [...columnNames];
    console.log(currentColumn);
    if (filterByNumericValues.length > 0) {
      console.log('vrau');
      currentColumn = currentColumn.reduce((acc, curr) => filterByNumericValues.forEach((item) => (item.column !== curr ? acc : [])));
      // currentColumn = filterByNumericValues.map((item) => columnNames.filter((columnName) => columnName !== item.column));
      // currentColumn = currentColumn.filter((columnName) => (
        // filterByNumericValues.forEach((item) => columnName !== item.column)));
      setFilteredColumn(currentColumn);
    }
    console.log(currentColumn);
    return currentColumn;
  };

  useEffect(() => {
    removeColumnOption();
  }, [filterByNumericValues]);

  return (
    <div className="search-container">
      <label htmlFor="column-filter">
        Categoria:
        <select
          id="column-filter"
          data-testid="column-filter"
          onChange={ (event) => setColumn(event.target.value) }
          value={ column }
          name="column"
        >
          {filteredColumn && filteredColumn.map((item, index) => <option key={ index }>{item}</option>)}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Faixa de valor:
        <select
          id="comparison-filter"
          data-testid="comparison-filter"
          onChange={ (event) => setComparison(event.target.value) }
          value={ comparison }
          name="comparison"
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        Valor:
        <input
          id="value-filter"
          data-testid="value-filter"
          type="number"
          onChange={ (event) => setValue(event.target.value) }
          value={ value }
          name="value"
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => addFilterOnList(column, comparison, value) }
      >
        Adicionar Filtro
      </button>
    </div>
  );
}

export default SearchByNumericValue;
