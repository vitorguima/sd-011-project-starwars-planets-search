import React, { useState, useContext, useEffect } from 'react';
import FilterPlanetsByNumericValues from '../../helpers/FilterPlanetsByNumericValues';
import PlanetsContext from '../../context/PlanetsContext';

export default function Table() {
  const { data, filters } = useContext(PlanetsContext);
  const [filteredPlanets, setFilteredPlanets] = useState(['Loading']);

  useEffect(() => {
    const REG_EXP_TO_FILTER_NAME = new RegExp(filters.filterByName.name, 'gi');
    let planets = data.filter((planet) => planet.name.match(REG_EXP_TO_FILTER_NAME));
    planets = FilterPlanetsByNumericValues(planets, filters, setFilteredPlanets);
    setFilteredPlanets(planets);
  }, [data, filters]);

  return (
    <table>
      <thead>
        <tr>
          <th>Name:</th>
          <th>Climate:</th>
          <th>CreatedAt:</th>
          <th>Diameter:</th>
          <th>Edited:</th>
          <th>Films:</th>
          <th>Gravity:</th>
          <th>Orbital Period</th>
          <th>Population</th>
          <th>Rotation Period</th>
          <th>Surface Water:</th>
          <th>Terrain</th>
          <th>Url:</th>
        </tr>
      </thead>
      <tbody>
        {
          (
            filteredPlanets.map((planet, index) => (
              <tr key={ index }>
                <td>{ planet.name }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.created }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.edited }</td>
                <td>{ planet.filmes }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.population }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.url }</td>
              </tr>
            ))
          )
        }
      </tbody>
    </table>
  );
}
