import React, { useState, useContext } from 'react';
import ContextApi from '../context/ContextApi';

export default function FilteredNumbers() {
  const { data, setStarWarsPlanets } = useContext(ContextApi);
  const [filterNumbers, setFilterNumbers] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const [filterChecked, setFilterChecked] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });

  // Pega os eventos de onChange e escreve no setFilterNumbers
  function handleChangeValues({ target: { name, value } }) {
    setFilterNumbers({
      ...filterNumbers,
      [name]: value,
    });
    console.log(filterNumbers);
  }

  // Filtros dos selects
  const filtersValueFunc = () => {
    const { column, comparison, value } = filterNumbers;
    const filterByValue = data.filter((item) => {
      if (comparison === 'maior que') {
        return Number(item[column]) > Number(value);
      } if (comparison === 'menor que') {
        return Number(item[column]) < Number(value);
      }
      return Number(item[column]) === Number(value);
    });

    return setStarWarsPlanets(filterByValue);
  };

  // Muda o estado de filterChecked e chama a funcao para o filtro dos selects
  function checkedAdd(filter) {
    setFilterChecked({
      ...filterChecked,
      filterByNumericValues: [
        ...filterChecked.filterByNumericValues,
        filter,
      ],
    });
    console.log(filterChecked);
    filtersValueFunc();
  }
  // Botao de filtrar, chamando a funcao checkedAdd
  function handleClick() {
    checkedAdd(filterNumbers);
  }

  return (
    <div>
      <select
        name="column"
        data-testid="column-filter"
        onChange={ handleChangeValues }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ handleChangeValues }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        name="value"
        data-testid="value-filter"
        onChange={ handleChangeValues }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </div>
  );
}
