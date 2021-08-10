import React, { useContext, useEffect } from 'react';
import PlanetsAPI from '../helpers/PlanetsAPI';
import SWPlanetsContext from '../context/Context';
import { filteredNumericValues, sortColumns } from './Filters';
import RemoveFilters from './RemoveFilters';
import Loading from '../images/swloading.gif';

function Table() {
  const { planets } = PlanetsAPI();
  const {
    loading,
    initialFilters,
    filteredInfo,
    setFilteredInfo,
  } = useContext(SWPlanetsContext);

  useEffect(() => {
    if (planets) {
      sortColumns(initialFilters, planets);
      const getFilteredInfo = planets.filter((item) => {
        const { name, ...items } = item;
        const filterName = name.toLowerCase()
          .includes(initialFilters.filterByName.name.toLowerCase());
        const getComparisonValue = filteredNumericValues(initialFilters, items);
        return filterName && getComparisonValue;
      });
      setFilteredInfo(getFilteredInfo);
    }
  }, [initialFilters, planets, setFilteredInfo]);

  if (loading) {
    return (
      <img
        src={ Loading }
        alt="carregando"
      />
    );
  }

  return (
    <div>
      <RemoveFilters />
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
          { filteredInfo.map((p, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{ p.name }</td>
              <td>{ p.rotation_period }</td>
              <td>{ p.orbital_period }</td>
              <td>{ p.diameter }</td>
              <td>{ p.climate }</td>
              <td>{ p.gravity }</td>
              <td>{ p.terrain }</td>
              <td>{ p.surface_water }</td>
              <td>{ p.population }</td>
              <td>{ p.films }</td>
              <td>{ p.created }</td>
              <td>{ p.edited }</td>
              <td>{ p.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
