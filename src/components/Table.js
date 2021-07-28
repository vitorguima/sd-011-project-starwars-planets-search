import React, { useEffect, useContext, useState } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { data } = useContext(MyContext);
  const [filterName, filteredName] = useState([]);

  useEffect(() => {
    filteredName();
  }, []);
  const planets1 = filterName ? data
    .filter((planet) => planet.name.includes(filterName)) : data;
  return (
    <div>
      <label htmlFor="input">
        <input
          data-testid="name-filter"
          onChange={ (e) => filteredName(e.target.value) }
        />
      </label>
      <table className="table">
        <thead>
          <tr>
            { data.map((planets) => Object.keys(planets)
              .filter((el) => el !== 'residents')
              .map((keysPlanets, index) => (
                <th
                  key={ `key ${index}` }
                >
                  {keysPlanets}
                </th>)))[0] }
          </tr>
        </thead>
        <tbody>
          { planets1.map((planets, index) => (
            <tr key={ `key ${index}` }>
              { Object.entries(planets)
                .filter((element) => !element.includes('residents'))
                .map((planet, i) => (<td key={ `key ${i}` }>{planet[1]}</td>)) }
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
