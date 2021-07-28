import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { data } = useContext(MyContext);
  // console.log(data);

  return (
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
        { data.map((planets, index) => (
          <tr key={ `key ${index}` }>
            { Object.entries(planets)
              .filter((element) => !element.includes('residents'))
              .map((planet, i) => (<td key={ `key ${i}` }>{planet[1]}</td>)) }
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;
