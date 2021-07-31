import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import FilterInputs from './FilterInputs';

const Table = () => {
  const { data, titles, filters, filtered } = useContext(PlanetsContext);
  const { filterByName: { name }, filterByNumericValues } = filters;

  const filterPlanets = !name ? filtered : filtered.filter((planet) => planet
    .name.toLowerCase().includes(name));

  const filterColumns = () => {
    const newFilter = filterPlanets.filter((item) => {
      let getComparison = true;
      filterByNumericValues.forEach(({ column, comparison, value }) => {
        switch (comparison) {
        case 'maior que':
          getComparison = getComparison && Number(item[column]) > Number(value);
          break;
        case 'menor que':
          getComparison = getComparison && Number(item[column]) < Number(value);
          break;
        case 'igual a':
          getComparison = getComparison && Number(item[column]) === Number(value);
          break;
        default:
          getComparison = false;
          break;
        }
      });
      return getComparison;
    });
    return newFilter;
  };

  if (data.length === 0) return <div>Loading...</div>;

  const filterAllPlanets = filterColumns();

  return (
    <div>
      <FilterInputs />
      <table>
        <thead>
          <tr>
            {
              titles.map((title) => (
                <th key={ title }>{title}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            filterAllPlanets.map((items, index) => (
              <tr key={ index }>
                <td>{items.name}</td>
                <td>{items.rotation_period}</td>
                <td>{items.orbital_period}</td>
                <td>{items.diameter}</td>
                <td>{items.climate}</td>
                <td>{items.gravity}</td>
                <td>{items.terrain}</td>
                <td>{items.surface_water}</td>
                <td>{items.population}</td>
                <td>{items.films}</td>
                <td>{items.created}</td>
                <td>{items.edited}</td>
                <td>{items.url}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
