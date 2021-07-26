import React from 'react';
import MyContext from './MyContext';

function Table() {
  return (
    <MyContext.Consumer>
      { (value) => (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rotatio Period</th>
              <th>Orbital Period</th>
              <th>Diameter</th>
              <th>Climate</th>
              <th>Gravity</th>
              <th>Terrain</th>
              <th>SurfaceWater</th>
              <th>Population</th>
              <th>Residents</th>
              <th>Films</th>
              <th>Created</th>
              <th>Edited</th>
            </tr>
          </thead>
          <tbody>
            { value.map(({
              name,
              rotation_period: rotatioPeriod,
              orbital_period: orbitalPeriod,
              diameter,
              climate,
              gravity,
              terrain,
              surface_water: surfaceWater,
              population,
              residents,
              films,
              created,
              edited,
            }, index) => (
              <tr key={ index }>
                <th>{ name }</th>
                <th>{ rotatioPeriod }</th>
                <th>{ orbitalPeriod }</th>
                <th>{ diameter }</th>
                <th>{ climate }</th>
                <th>{ gravity }</th>
                <th>{ terrain }</th>
                <th>{ surfaceWater }</th>
                <th>{ population }</th>
                <th>{ residents.length }</th>
                <th>{ films.length }</th>
                <th>{ created }</th>
                <th>{ edited }</th>
              </tr>
            )) }
          </tbody>
        </table>
      ) }
    </MyContext.Consumer>
  );
}

export default Table;
