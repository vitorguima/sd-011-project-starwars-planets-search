import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

export default function Table() {
  const { planetsFilter } = useContext(MyContext);
  console.log(planetsFilter);
  return (
    <div>
      {planetsFilter.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(planetsFilter[0]).map((obj, index) => (
                <th key={ index }>{obj}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {planetsFilter.map((val, index) => (
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
