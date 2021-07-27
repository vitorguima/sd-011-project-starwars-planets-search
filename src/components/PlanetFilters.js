import React, { useContext, useState } from 'react';
import SpacesContext from '../context/SpacesContext';

function PlanetFilters() {
  const {
    filters,
    setFilters,
    setFilteredPlanets,
    planetList,
  } = useContext(SpacesContext);

  const [planetName, setPlanetName] = useState('');
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');
  const [index, setIndex] = useState(0);

  function handleNameInput(target) {
    setPlanetName(target.value);
    setFilters({ ...filters, filterByName: { name: target.value } });
    setFilteredPlanets(
      planetList
        .filter(({ name }) => name.toLowerCase().includes(target.value.toLowerCase())),
    );
  }

  function handleNumberInputs(target) {
    const { filterByNumericValues } = filters;
    const functions = {
      column: setColumn,
      comparison: setComparison,
      value: setValue,
    };
    functions[target.name](target.value);
    setFilters({
      ...filters,
      filterByNumericValues: [
        {
          ...filterByNumericValues[index],
          [target.name]: target.value,
        }],
    });
  }
  // tattoine, yavin, dagobah, bespin, endor, naboo
  function handleFilterButton(columnName, compareLogic, compareValue) {
    const compareNumber = Number(compareValue);
    const comparisonTypes = {
      population: {
        higher: planetList
          .filter(({ population }) => Number(population) > compareNumber),
        equal: planetList
          .filter(({ population }) => Number(population) === compareNumber),
        smaller: planetList
          .filter(({ population }) => Number(population) < compareNumber),
      },
      orbitalPeriod: {
        higher: planetList
          .filter(({ orbital_period: period }) => Number(period) > compareNumber),
        equal: planetList
          .filter(({ orbital_period: period }) => Number(period) === compareNumber),
        smaller: planetList
          .filter(({ orbital_period: period }) => Number(period) < compareNumber),
      },
      diameter: {
        higher: planetList.filter(({ diameter }) => Number(diameter) > compareNumber),
        equal: planetList.filter(({ diameter }) => Number(diameter) === compareNumber),
        smaller: planetList.filter(({ diameter }) => Number(diameter) < compareNumber),
      },
      rotationPeriod: {
        higher: planetList
          .filter(({ rotation_period: rot }) => Number(rot) > compareNumber),
        equal: planetList
          .filter(({ rotation_period: rot }) => Number(rot) === compareNumber),
        smaller: planetList
          .filter(({ rotation_period: rot }) => Number(rot) < compareNumber),
      },
      surfaceWater: {
        higher: planetList
          .filter(({ surface_water: water }) => (
            Number(water) ? Number(water) : 0) > compareNumber),
        equal: planetList
          .filter(({ surface_water: water }) => (
            Number(water) ? Number(water) : 0) === compareNumber),
        smaller: planetList
          .filter(({ surface_water: water }) => (
            Number(water) ? Number(water) : 0) < compareNumber),
      },
    };

    if (columnName && compareLogic && compareValue) {
      setFilteredPlanets(comparisonTypes[columnName][compareLogic]);
      setIndex(index + 1);
    } else {
      setFilteredPlanets(planetList);
    }
  }

  return (
    <div>
      <form>
        <label htmlFor="filter-by-name">
          <input
            id="filter-by-name"
            type="text"
            data-testid="name-filter"
            placeholder="busque pelo nome"
            name="name-filter"
            value={ planetName }
            onChange={ ({ target }) => handleNameInput(target) }
          />
        </label>
        <label htmlFor="filter-by-column">
          Filtro por categoria
          <select
            value={ column }
            data-testid="column-filter"
            id="filter-by-column"
            onChange={ ({ target }) => handleNumberInputs(target) }
            name="column"
          >
            <option value="">-</option>
            <option value="population">population</option>
            <option value="orbitalPeriod">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotationPeriod">rotation_period</option>
            <option value="surfaceWater">surface_water</option>
          </select>
        </label>
        <label htmlFor="filter-by-range">
          Raio do valor
          <select
            data-testid="comparison-filter"
            id="filter-by-range"
            value={ comparison }
            onChange={ ({ target }) => handleNumberInputs(target) }
            name="comparison"
          >
            <option value="">-</option>
            <option value="higher">maior que</option>
            <option value="smaller">menor que</option>
            <option value="equal">igual a</option>
          </select>
        </label>
        <label htmlFor="range-value">
          <input
            id="range-value"
            type="number"
            data-testid="value-filter"
            placeholder="insira o valor da busca"
            value={ value }
            onChange={ ({ target }) => handleNumberInputs(target) }
            name="value"
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => handleFilterButton(column, comparison, value) }
        >
          Filtrar
        </button>
      </form>
    </div>
  );
}

export default PlanetFilters;
