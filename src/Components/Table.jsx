import React from 'react';
import { GlobalContext } from '../GlobalContext';

const Table = () => {
  const { data } = React.useContext(GlobalContext);
  const [value, setValue] = React.useState('');
  const currentData = value
    ? data.filter((planet) => planet.name.toLowerCase().includes(value)) : data;

  return (
    <>
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
          {currentData.map((expense, idx) => (
            <tr key={ idx }>
              <td>{ expense.name }</td>
              <td>{ expense.rotation_period }</td>
              <td>{ expense.orbital_period }</td>
              <td>{ expense.diameter }</td>
              <td>{ expense.climate }</td>
              <td>{ expense.gravity }</td>
              <td>{ expense.terrain }</td>
              <td>{ expense.surface_water }</td>
              <td>{ expense.population }</td>
              <td>{ expense.films }</td>
              <td>{ expense.created }</td>
              <td>{ expense.edited }</td>
              <td>{ expense.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
