import React, { useContext } from 'react';
import MyContext from './MyContext';

export default function Table() {
  const { planets } = useContext(MyContext);
  // console.log(value);
  return (
    <div>
      {planets && (
        <table>
          <tr>
            {planets[0] && Object.keys(planets[0]).map((obj, index) => (
              <th key={ index }>{obj}</th>
            ))}
          </tr>
          {planets && planets.map((val, idx) => (
            <tr key={ idx }>
              {Object.values(val).map((obj, index) => (
                <td key={ index }>{obj}</td>
              ))}
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}
