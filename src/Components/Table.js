import React, { useEffect, useContext, useState } from 'react';
import Context from '../Context/Context';
import TableHead from './Thead';
// import MockApiData from './mock';

function Table() {
  const { planets, getPlanets, setFilteredPlanets } = useContext(Context);
  const { getFilter, filtersByName, filteredPlanets } = useContext(Context);
  const [filterByNumericValuess, setFilterByNumericValuess] = useState(
    {
      column: 'population',
      comparison: 'maior que',
      value: 0,
    },
  );

  useEffect(() => {
    const fetchPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const data = await fetch(endpoint).then((datas) => datas.json());
      getPlanets(data.results);
    };
    fetchPlanets();
  }, [getPlanets]);

  const handleChange = ({ target }) => {
    filtersByName(target.value);
    getFilter({ filterByName: {
      name: target.value } });
  };

  const handleNumberChange = ({ target }) => {
    const { name, value } = target;
    setFilterByNumericValuess({
      ...filterByNumericValuess,
      [name]: value,
    });
  };

  const tableFiltered = () => {
    if (filteredPlanets.length >= 1) {
      return (filteredPlanets.map(({
        name,
        climate,
        created,
        diameter,
        edited,
        gravity,
        orbital_period: orbitalPeriod,
        population,
        rotation_period: rotationPeriod,
        surface_water: surfaceWater,
        terrain,
        films,
        url,
      }) => (
        <tr key={ name } id={ name }>
          <td className="planet">{name}</td>
          <td className="planet">{climate}</td>
          <td className="planet">{created}</td>
          <td className="planet">{diameter}</td>
          <td className="planet">{edited}</td>
          <td className="planet">{gravity}</td>
          <td className="planet">{orbitalPeriod}</td>
          <td className="planet">{population}</td>
          <td className="planet">{rotationPeriod}</td>
          <td className="planet">{surfaceWater}</td>
          <td className="planet">{terrain}</td>
          <td className="planet">{films}</td>
          <td className="planet">{url}</td>
        </tr>))
      );
    }

    return (planets.map(({
      name,
      climate,
      created,
      diameter,
      edited,
      gravity,
      orbital_period: orbitalPeriod,
      population,
      rotation_period: rotationPeriod,
      surface_water: surfaceWater,
      terrain,
      films,
      url,
    }) => (
      <tr key={ name } id={ name }>
        <td className="planet">{name}</td>
        <td className="planet">{climate}</td>
        <td className="planet">{created}</td>
        <td className="planet">{diameter}</td>
        <td className="planet">{edited}</td>
        <td className="planet">{gravity}</td>
        <td className="planet">{orbitalPeriod}</td>
        <td className="planet">{population}</td>
        <td className="planet">{rotationPeriod}</td>
        <td className="planet">{surfaceWater}</td>
        <td className="planet">{terrain}</td>
        <td className="planet">{films}</td>
        <td className="planet">{url}</td>
      </tr>)));
  };

  const handleNumbFilter = () => {
    getFilter({ filterByNumericValues: [
      {
        column: filterByNumericValuess.column,
        comparison: filterByNumericValuess.comparison,
        value: filterByNumericValuess.values,
      },
    ] });

    const { column, comparison, value } = filterByNumericValuess;
    const searchedPlanets = () => {
      if (filterByNumericValuess) {
        switch (comparison) {
        case 'maior que':
          return planets.filter(
            (planet) => parseInt(planet[column], 0) > parseInt(value, 0),
          );
        case 'menor que':
          return planets.filter(
            (planet) => parseInt(planet[column], 0) < parseInt(value, 0),
          );
        case 'igual a':
          return planets.filter(
            (planet) => parseInt(planet[column], 0) === parseInt(value, 0),
          );
        default:
        }
      }
      return planets;
    };
    setFilteredPlanets(searchedPlanets());
    const node = document.getElementById(column);
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  };

  return (
    <div>
      <label htmlFor="filter">
        Pesquisar
        <input
          type="text"
          id="filter"
          name="filter"
          onChange={ handleChange }
          data-testid="name-filter"
        />
      </label>
      <form>
        <label htmlFor="column">
          coluna
          <select
            onChange={ handleNumberChange }
            id="colum"
            name="column"
            data-testid="column-filter"
          >
            <option id="population" value="population">population</option>
            <option id="orbital_period" value="orbital_period">orbital_period</option>
            <option id="diameter" value="diameter">diameter</option>
            <option id="rotation_period" value="rotation_period">rotation_period</option>
            <option id="surface_water" value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison">
          comparison
          <select
            id="comparison"
            onChange={ handleNumberChange }
            name="comparison"
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          onChange={ handleNumberChange }
          type="number"
          name="value"
          data-testid="value-filter"
        />
        <button
          type="button"
          data-testid="button-filter"
          className="btn"
          onClick={ handleNumbFilter }
        >
          filtrar
        </button>
      </form>
      <table border="1px" cellPadding="5px" cellSpacing="0">
        <TableHead />
        <tbody>
          { tableFiltered() }
        </tbody>
      </table>
    </div>
  );
}
export default Table;
