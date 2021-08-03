import React, { useContext, useEffect, useState } from 'react';
import starWarsContex from '../context/starWarsContex';

export default function Table() {
  const data = useContext(starWarsContex);
  const [filters, setfilters] = useState({
    filterByName: {
      name: '',
    },
  });

  const [filtered, setfitered] = useState([]);

  useEffect(() => {
    function filterData() {
      let newArray = data;
      if (newArray.length > 0 && filters.filterByName.name) {
        newArray = newArray
          .filter((item) => item.name.toLowerCase()
            .includes(filters.filterByName.name.toLowerCase()));
      }
      setfitered(newArray);
    }
    filterData();
  },
  [data, filters]);

  const handleInputName = ({ target: { value } }) => {
    setfilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };

  return (
    <>
      <input
        type="text"
        onChange={ (e) => handleInputName(e) }
        data-testid="name-filter"
      />
      <table>
        <thead>
          <tr>
            <th>climate</th>
            <th>created</th>
            <th>diameter</th>
            <th>edited</th>
            <th>films</th>
            <th>gravity</th>
            <th>name</th>
            <th>orbital_period</th>
            <th>population</th>
            <th>rotation_period</th>
            <th>surgace_water</th>
            <th>terrain</th>
            <th>url</th>
          </tr>
        </thead>
        {filtered.map((planet, index) => (
          <tbody key={ index }>
            <tr key={ index }>
              <td>{ planet.climate }</td>
              <td>{ planet.created }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.films.map((film, i) => (<p key={ i }>{ film }</p>))}</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.name }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.population }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.url }</td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}
