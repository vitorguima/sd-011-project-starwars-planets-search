import React, { useContext } from 'react';
import GlobalContext from './Context';

const Table = () => {
  const [planetName, setPlanetName] = React.useState('');
  const { results } = useContext(GlobalContext);

  const handleChange = ({ target }) => {
    setPlanetName(target.value);
  };

  if (!results) return <div>Loading...</div>;
  return (
    <div>
      <input
        type="text"
        value={ planetName }
        onChange={ handleChange }
        data-testid="name-filter"
      />
      <table>
        <thead>
          <tr>
            {Object
              .keys(results[0])
              .filter((content) => content !== 'residents')
              .map((header, index) => <th key={ index }>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {results
            .filter((content) => content !== 'residents')
            .filter((planet) => planet.name.includes(planetName))
            .map((planet, index) => (
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
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
