import React, { useContext } from 'react';
import MyContext from './MyContext';

export default function Table() {
  const value = useContext(MyContext);
  // console.log(value);
  return (
    <div>
      {value && (
        <table>
          <tr>
            {Object.keys(value[0]).map((obj, index) => (
              <th key={ index }>{obj}</th>
            ))}
          </tr>
          {value && value.map((val, idx) => (
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
