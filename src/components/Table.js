import React from 'react';
import { Context } from '../hooks/Context';

const Table = () => {
  const { data } = React.useContext(Context);
  const [value, setValue] = React.useState('');
  const currentData = value
    ? data.filter((planet) => planet.name.toLowerCase().includes(value)) : data;

  return (
    <div className="table">
      <form>
        <input
          type="text"
          placeholder="Nome do Planeta"
          onChange={ ({ target }) => setValue(target.value) }
          data-testid="name-filter"
        />
      </form>
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
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((info, index) => (
            <tr key={ index }>
              <td>{ info.name }</td>
              <td>{ info.rotation_period }</td>
              <td>{ info.orbital_period }</td>
              <td>{ info.diameter }</td>
              <td>{ info.climate }</td>
              <td>{ info.gravity }</td>
              <td>{ info.terrain }</td>
              <td>{ info.surface_water }</td>
              <td>{ info.population }</td>
              <td>{ info.films }</td>
              <td>{ info.created }</td>
              <td>{ info.edited }</td>
              <td>{ info.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
