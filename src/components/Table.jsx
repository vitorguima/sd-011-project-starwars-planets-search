import React, { useContext } from 'react';
import StarsContext from '../context/StarsContext';

export default function Table() {
  const { data } = useContext(StarsContext);
  console.log(data);
  return (
    <div>
      <table>
        <thead>
          <tr>
            {data.length > 0 && Object.keys(data[0]).map((column, index) => (
              column !== 'residents' ? <th key={ index }>{column}</th> : null
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((planet, index) => (
            <tr key={ index }>
              {Object.values(planet).map((info) => (
                <td key={ info.name }>
                  {info}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
