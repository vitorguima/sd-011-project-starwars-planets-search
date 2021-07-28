import React, { useContext, useMemo } from 'react';
import PlanetsContext from '../Context/PlanetsContext';
import SearchBar from './SearchBar';

function Table() {
  const { data, name, column, comparison, value, button } = useContext(PlanetsContext);

  const filterPlanets = useMemo(() => {
    const lowerCasePlanets = name.toLowerCase();
    return data.filter((element) => element.name
      .toLowerCase().includes(lowerCasePlanets));
  }, [data, name]);

  const filterPlanetsNumber = useMemo(() => {
    if (button) {
      if (comparison === 'igual') {
        return filterPlanets.filter((element) => element[column] === value);
      }
      if (comparison === 'maior') {
        return filterPlanets.filter((element) => element[column] === value);
      }
      if (comparison === 'menor') {
        return filterPlanets.filter((element) => element[column] === value);
      }
    }
  }, [column, button, filterPlanets, value, comparison]);

  return (
    <div>
      <SearchBar />
      <table id="table">
        <thead id="head">
          <tr>
            <th>name</th>
            <th>rotation_period</th>
            <th>orbital_period</th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface_water</th>
            <th>population</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody id="body">
          {data && (
            filterPlanetsNumber.map((planet, index) => (
              <tr key={ index }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>
                  {planet.films
                    .map((film, numberKey) => <p id="aeo" key={ numberKey }>{film}</p>)}
                </td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            )))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
