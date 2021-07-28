import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

export default function Table() {
  const { planets } = useContext(MyContext);
  console.log(planets);
  return (
    <div>
      {planets && (
        <table>
          <thead>
            <tr>
              {Object.keys(planets[0]).map((obj, index) => (
                <th key={ index }>{obj}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {planets.map((val, index) => (
              <tr key={ index }>
                {Object.values(val).map((obj, idx) => (
                  <td key={ idx }>{obj}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) }
    </div>
  );
}
