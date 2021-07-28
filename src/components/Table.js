import React, { useContext, useEffect } from 'react';
import FetchApi from './FetchApi';
import PlanetsContext from '../hooks/PlanetsContext';
import filteredNumericValues from '../helpers/filteredNumericValues';
import DelFilters from './DelFilters';

function Table() {
  const { data } = FetchApi();
  const {
    initialFilters,
    filteredInfo,
    setFilteredInfo,
  } = useContext(PlanetsContext);

  useEffect(() => {
    if (data) {
      const getFilteredInfo = data.filter((item) => {
        const { name, ...items } = item;
        const filterName = name.toLowerCase()
          .includes(initialFilters.filterByName.name.toLowerCase());
        const getComparisonValue = filteredNumericValues(initialFilters, items);
        return filterName && getComparisonValue;
      });
      setFilteredInfo(getFilteredInfo);
    }
  }, [initialFilters, data, setFilteredInfo]);

  return (
    <div>
      <DelFilters />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { filteredInfo.map((planets, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{ planets.name }</td>
              <td>{ planets.rotation_period }</td>
              <td>{ planets.orbital_period }</td>
              <td>{ planets.diameter }</td>
              <td>{ planets.climate }</td>
              <td>{ planets.gravity }</td>
              <td>{ planets.terrain }</td>
              <td>{ planets.surface_water }</td>
              <td>{ planets.population }</td>
              <td>{ planets.films }</td>
              <td>{ planets.created }</td>
              <td>{ planets.edited }</td>
              <td>{ planets.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
