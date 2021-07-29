import React, { useEffect, useContext } from 'react';
import Context from '../Context/Context';
import TableHead from './Thead';

function Table() {
  const { planets } = useContext(Context);
  const { getFilter, filtersByName, filteredPlanets } = useContext(Context);
  const handleChange = ({ target }) => {
    filtersByName(target.value);
    getFilter({ filterByName: {
      name: target.value } });
  };

  const { getPlanets } = useContext(Context);
  useEffect(() => {
    const fetchPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const data = await fetch(endpoint).then((datas) => datas.json());
      getPlanets(data);
    };
    fetchPlanets();
  }, [getPlanets]);

  const tableFiltered = () => {
    if (filteredPlanets === undefined) {
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
    }
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
