import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function MainPage() {
  const { filteredPlanets,
    optionsColumn,
    formNumeric,
    handleFilterByName,
    handleFilterByNumericValues,
    onClickButtonNumericValues,
  } = useContext(StarWarsContext);

  const planetLine = (planet) => {
    const {
      name,
      rotation_period: rotationalPeriod,
      orbital_period: orbitalPeriod,
      diameter,
      climate,
      terrain,
      gravity,
      surface_water: surfaceWater,
      population,
      residents,
      films,
      created,
      edited,
    } = planet;
    return (
      <tr key={ name }>
        <td>{name}</td>
        <td>{rotationalPeriod}</td>
        <td>{orbitalPeriod}</td>
        <td>{diameter}</td>
        <td>{climate}</td>
        <td>{terrain}</td>
        <td>{gravity}</td>
        <td>{surfaceWater}</td>
        <td>{population}</td>
        <td>
          {residents.map((resident) => <a key={ resident } href={ resident }>Link</a>)}
        </td>
        <td>{films.map((film) => <a key={ film } href={ film }>Link</a>)}</td>
        <td>{created}</td>
        <td>{edited}</td>
      </tr>
    );
  };

  const comparisons = ['maior que', 'menor que', 'igual a'];
  const { column, comparison, value } = formNumeric;

  return (
    <div>
      <div>
        <form>
          <label htmlFor="name-filter">
            <input
              type="text"
              name="name-filter"
              onChange={ handleFilterByName }
              data-testid="name-filter"
            />
          </label>
        </form>
        <form>
          <label htmlFor="column">
            <select
              name="column"
              onChange={ handleFilterByNumericValues }
              data-testid="column-filter"
              value={ column }
            >
              { optionsColumn.map((item) => (
                <option key={ item } value={ item }>{ item }</option>
              ))}
            </select>
          </label>
          <label htmlFor="comparison">
            <select
              name="comparison"
              onChange={ handleFilterByNumericValues }
              data-testid="comparison-filter"
              value={ comparison }
            >
              { comparisons.map((item) => (
                <option key={ item } value={ item }>{ item }</option>
              ))}
            </select>
          </label>
          <label htmlFor="value">
            <input
              type="number"
              name="value"
              onChange={ handleFilterByNumericValues }
              data-testid="value-filter"
              value={ value }
            />
          </label>
          <button
            data-testid="button-filter"
            type="button"
            // disabled={ !(column && comparison) }
            onClick={ () => {
              onClickButtonNumericValues(column, comparison, value);
            } }
          >
            Filter
          </button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotational Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Terrain</th>
            <th>Gravity</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Residents</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
          </tr>
        </thead>
        <tbody>
          {/* { filteredPlanets.length > 0 && filteredPlanets.map((planet) => (
            planetLine(planet)
          ))} */}
          { filteredPlanets.length > 0 && filteredPlanets.map((planet) => (
            planetLine(planet)
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MainPage;
