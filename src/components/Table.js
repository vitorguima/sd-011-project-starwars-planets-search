import React, { useEffect, useState } from 'react';
import { useAuth } from '../providers/auth';
import SearchPlanet from './SearchPlanet';

function Table() {
  const [state, setState] = useState({
    loading: true,
    planets: '',
    filterByName: '',
    filterByNumericValues: [],
  });

  const { planets, filters } = useAuth();

  useEffect(() => {
    setState({
      planets: planets.data.results,
      filterByName: filters.filterByName.name,
      filterByNumericValues: filters.filterByNumericValues,
      loading: false,
    });
    abadabadu();
  }, [planets, filters]);

  const abadabadu = () => {
    const planetas = state.planets;
    const { filterByNumericValues } = filters;
    const { comparison, value, column } = filterByNumericValues[0];

    if (comparison === 'maior que') {
      const teste = planetas.filter((planet) => (
        planet[column] > value
      ));
      console.log(teste);
    }
  };

  return (
    <div>
      <SearchPlanet />
      <table>
        <tr>
          {state.planets && Object.keys(state.planets[0]).map((key, index) => {
            if (key === 'residents') return null;
            return <th key={ index }>{ key }</th>;
          })}
        </tr>
        {state.planets && state.planets
          .filter((planet) => planet.name.includes(state.filterByName))
          .map((planet, index) => {
            delete planet.residents;
            return (
              <tr key={ index }>
                {Object.values(planet).map((info, indexTd) => (
                  <td key={ indexTd }>{ info }</td>
                ))}
              </tr>
            );
          })}
      </table>
    </div>
  );
}

export default Table;
