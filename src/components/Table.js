import React, { useEffect, useState } from 'react';
import { useAuth } from '../providers/auth';
import SearchPlanet from './SearchPlanet';

function Table() {
  const [state, setState] = useState({
    loading: true,
    planets: '',
    filterByName: '',
  });

  const { planets, filters } = useAuth();

  useEffect(() => {
    setState({
      planets: planets.data.results,
      filterByName: filters.filterByName.name,
      loading: false,
    });
  }, [planets, filters]);

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
