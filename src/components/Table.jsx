import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

export default function Table() {
  const { data, loading, filters, setFilters } = useContext(StarwarsContext);

  const inputHandle = ({ target }) => {
    setFilters(
      { ...filters, filterByName: { name: target.value } },
    );
  };

  if (loading) {
    return (<h1>Loading...</h1>);
  }

  const filterPlanets = data.results.filter((item) => (
    item.name.toLowerCase().includes(filters.filterByName.name)));

  return (
    <div>
      <h1>Trybe Wars</h1>

      <input
        type="text"
        value={ filters.filterByName.name }
        onChange={ inputHandle }
        data-testid="name-filter"
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Climate</th>
            <th>Created</th>
            <th>Diameter</th>
            <th>Edited</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Url</th>
            <th>Films</th>
          </tr>
        </thead>
        <tbody>
          {filterPlanets.map((item) => (
            <tr key={ item.name }>
              <td>{ item.name }</td>
              <td>{item.climate}</td>
              <td>{item.created}</td>
              <td>{item.diameter}</td>
              <td>{item.edited}</td>
              <td>{item.gravity}</td>
              <td>{item.terrain}</td>
              <td>{item.surface_water}</td>
              <td>{item.population}</td>
              <td>{item.rotation_period}</td>
              <td>{item.orbital_period}</td>
              <td>{item.url}</td>
              <td>
                {item.films.map((film, index) => (
                  <p key={ index }>{film}</p>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}
