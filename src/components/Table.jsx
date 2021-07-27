import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../Context/PlanetsContext';
import SeachBar from './SeachBar';

function Table() {
  const { data, keyWord, setData } = useContext(PlanetsContext);
  useEffect(() => {
    if (keyWord.length !== 0) {
      const filterData = data.filter((test) => test.name === keyWord);
      setData(filterData);
    }
  }, [keyWord, data, setData]);
  return (
    <div>
      <SeachBar />
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
            data.map((planet, index) => (
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
                {planet.films
                  .map((film, numberKey) => <td key={ numberKey }>{film}</td>)}
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
