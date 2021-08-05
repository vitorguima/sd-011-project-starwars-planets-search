import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const { filteredPlanets } = useContext(PlanetsContext);
  // const [numFilters, setNumFilters] = useState([]);

  // const [column, setColumn] = useState('population');
  // const [comparison, setComparison] = useState('maior que');
  // const magicNumber = 100000;
  // const [value, setValue] = useState(magicNumber);

  const header = ['Name', 'Rotation', 'Orbital Period',
    'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population',
    'Films', 'Created', 'Edited', 'Url'];
  // const columns = ['population', 'orbital_period', 'diameter',
  //   'rotation_period', 'surface_water'];

  // function handleInputPlanet({ target }) {
  //   setFilters({ filters: { filterByName: { name: target.value } } });
  //   console.log(numFilters);
  // }

  // function handleNumFilters() {
  //   const filter = [...numFilters];
  //   filter.push({ column, comparison, value });
  //   setNumFilters(filter);
  // }

  // function handleClear() {
  //   setFilters({ filters: { filterByName: { name: '' } } });
  //   setNumFilters([]);
  //   setColumn('population');
  //   setComparison('maior que');
  //   setValue(magicNumber);
  // }

  return (
    <>
      {/* <form>
        <label htmlFor="column">
          Filter by:
          <select
            onChange={ (event) => setColumn(event.target.value) }
            data-testid="column-filter"
          >
            { columns.map((col, i) => (
              <option key={ i } value={ col }>{ col }</option>)) }
          </select>
        </label>
        <label htmlFor="comparison">
          Compare by:
          <select
            onChange={ (event) => setComparison(event.target.value) }
            data-testid="comparison-filter"
          >
            <option value="">Select your option</option>
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value">
          Value:
          <input
            type="number"
            onChange={ (event) => setValue(event.target.value) }
            data-testid="value-filter"
          />
        </label>
        <button
          type="button"
          onClick={ handleNumFilters }
          data-testid="button-filter"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={ handleClear }
        >
          X
        </button>
      </form> */}
      <table>
        <thead>
          <tr className="tableHead">
            {header.map((h, i) => <th key={ i }>{ h }</th>)}
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet, i) => (
            <tr key={ i } className="tableBody">
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films[0]}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
