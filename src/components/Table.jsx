import React, { useContext, useState } from 'react';
import PlanetContext from '../context/planetContext';

function Table() {
  const { planets, isLoading, keys } = useContext(PlanetContext);
  const [name, setName] = useState('');

  function teste(e) {
    setName(e.target.value);
    const teste1 = planets.results.filter((planet) => planet.name.includes(name));
    console.log(teste1);
  }

  return (
    <div>
      <input type="text" onChange={ (e) => teste(e) } />
      <table>
        <thead>
          <tr>
            {!isLoading && keys.map((key) => <th key={ key }>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {!isLoading && planets.results.map((planet, index) => (
            <tr key={ index }>
              {keys.map((key) => <td key={ key }>{planet[key]}</td>)}
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
