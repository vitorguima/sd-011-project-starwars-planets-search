import React, { useEffect, useState } from 'react';
import { useAuth } from '../providers/auth';

function Table() {
  const [state, setState] = useState({
    loading: true,
    planets: '',
  });

  const { user } = useAuth();

  useEffect(() => {
    setState({
      planets: user.data.results,
      loading: false,
    });
  }, [user]);

  return (
    <div>
      <table>
        <tr>
          {state.planets && Object.keys(state.planets[0]).map((key, index) => {
            if (key === 'residents') return null;
            return <th key={ index }>{ key }</th>;
          })}
        </tr>
        {state.planets && state.planets.map((planets, index) => {
          delete planets.residents;
          return (
            <tr key={ index }>
              {Object.values(planets).map((info, indexTd) => (
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
