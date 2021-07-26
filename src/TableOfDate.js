import React from 'react';
import PropTypes from 'prop-types';

function TableOfDate({ search }) {
  return (
    <div>
      { search.map((planet) => (
        <table key={ planet.name }>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rottion Period</th>
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{ planet.name }</th>
              <th>{ planet.rotation_period }</th>
              <th>{ planet.orbital_period }</th>
              <th>{ planet.diameter }</th>
              <th>{ planet.climate }</th>
              <th>{ planet.terrain }</th>
              <th>{ planet.surface_water }</th>
              <th>{ planet.population }</th>
              <th>{ planet.films }</th>
              <th>{ planet.created }</th>
              <th>{ planet.edited }</th>
              <th>{ planet.residents }</th>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

TableOfDate.propTypes = {
  search: PropTypes.func.isRequired,
};

export default TableOfDate;
