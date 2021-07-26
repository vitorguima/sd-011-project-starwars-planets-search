import React, { useContext, useEffect } from 'react';
import planetsContext from '../provider/planetsContext';
import Filter from './Filter';

function Table() {
  const {
    planets,
    setFilterPlanets,
    filterPlanets,
    changeFilter,
    filters,
    keys,
  } = useContext(planetsContext);
  useEffect(() => {
    if (planets !== undefined) {
      const filterName = filters.filterByName.name;
      setFilterPlanets(planets.filter(({ name }) => name.includes(filterName)));
    }
  }, [filters, planets, setFilterPlanets]);

  useEffect(() => {
    if (filters.filterByNumericValues.length > 0) {
        console.log('to aqui')
      filters.filterByNumericValues.forEach(({ collumn, comparison, value }) => {
       const filtred = filterPlanets.filter((planet) => {
          switch (comparison) {
          case 'maior que':
            return planet[collumn] > value;
            break;
          case 'menor que':
            return planet[collumn] < value;
            break;
          default:
            return planet[collumn] === value;
          }
        })
        setFilterPlanets(filtred);
      });
    }
  }, [filters]);

  if (filterPlanets !== undefined && keys !== undefined) {
    return (
      <>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ (event) => { changeFilter(event); } }
        />
        <Filter />
        <table>
          <tr>
            {keys.map((key) => <th key={ key }>{key}</th>)}
          </tr>
          {
            filterPlanets.map((planet, index) => (
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
              </tr>

            ))
          }
        </table>
      </>
    );
  }
  return <h3>Loading...</h3>;
}

export default Table;
