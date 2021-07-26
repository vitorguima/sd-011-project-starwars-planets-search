import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';
import Search from './Search';

function Table() {
  const data = useContext(MyContext);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);

  function toSearchInput({ target }) {
    setSearch({
      filters: { filterByName: { name: target.value } } });
    setFilter(data.filter((planet) => planet.name.includes(target.value)));
  }

  if (data.length === 0) return <p>Loading</p>;
  return (
    <div>
      <Search
        name={ search }
        handleChange={ toSearchInput }
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation period</th>
            <th>Orbital period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {filter.length === 0 ? data.map((element, index) => (
            <tr key={ index }>
              <td>{element.name}</td>
              <td>{element.rotation_period}</td>
              <td>{element.orbital_period}</td>
              <td>{element.diameter}</td>
              <td>{element.climate}</td>
              <td>{element.gravity}</td>
              <td>{element.terrain}</td>
              <td>{element.surface_water}</td>
              <td>{element.population}</td>
              <td>
                {element.films
                  .map((film, position) => <li key={ position }>{film}</li>)}
              </td>
              <td>{element.created}</td>
              <td>{element.edited}</td>
              <td>{element.url}</td>
            </tr>
          )) : filter.map((filtered, index) => (
            <tr key={ index }>
              <td>{filtered.name}</td>
              <td>{filtered.rotation_period}</td>
              <td>{filtered.orbital_period}</td>
              <td>{filtered.diameter}</td>
              <td>{filtered.climate}</td>
              <td>{filtered.gravity}</td>
              <td>{filtered.terrain}</td>
              <td>{filtered.surface_water}</td>
              <td>{filtered.population}</td>
              <td>
                {filtered.films
                  .map((film, position) => <li key={ position }>{film}</li>)}
              </td>
              <td>{filtered.created}</td>
              <td>{filtered.edited}</td>
              <td>{filtered.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
Table.contextType = MyContext;
