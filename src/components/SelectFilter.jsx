import React, { useContext, useState, useEffect } from 'react';
import { Planet } from '../context/Planet';

export default function SelectFilter() {
  const { data, setFilters, filters, planets, setPlanets } = useContext(Planet);

  const [activateFilter, setActivateFilter] = useState(false);

  const [filter, setFilter] = useState(
    {
      column: 'rotation_period',
      comparison: 'maior que',
      value: '',
    },
  );

  function filterPlanetsByNumericValues() {
    console.log('rodou');
    const { column, comparison, value } = filter;
    if (activateFilter && value) {
      console.log('passou aqui');
      const planetsToRender = planets.filter((planet) => {
        switch (comparison) {
        case 'maior que':
          console.log(`${Number(planet[column])} maior que ${Number(value)}`);
          return (Number(planet[column]) > Number(value));
        case 'menor que':
          console.log(`${Number(planet[column])} menor que ${Number(value)}`);
          return (Number(planet[column]) < Number(value));
        case 'igual a':
          console.log(`${Number(planet[column])} igual a ${Number(value)}`);
          return (Number(planet[column]) === Number(value));
        default:
          return console.log('nao deu');
        }
      });
      setPlanets(planetsToRender);
    }
  }

  useEffect(filterPlanetsByNumericValues,
    [activateFilter, filter.value, filter.column, filter.comparison]);

  function handleClick() {
    setActivateFilter(!activateFilter);
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
  }

  return (
    <>
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleChange }
        value={ filter.column }
      >
        <option checked>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleChange }
        value={ filter.comparison }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="value"
        placeholder="Digite um número para filtrar"
        onChange={ handleChange }
        value={ filter.value }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        { activateFilter ? 'Cancelar filtro' : 'filtrar'}
      </button>
    </>
  );
}
