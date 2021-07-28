import React from 'react';
import getApiData from '../Hooks/getApiData';
import Loading from './Loading';
import './Table.css';

function Table() {
  const [data, gotInfo] = getApiData();
  return !gotInfo ? (
    <Loading />
  ) : (
    <div>
      <table>
        <tbody>
          <tr>
            {Object.keys(data[0]).map((headerInfo, index) => (
              <th key={ index }>{headerInfo}</th>
            ))}
          </tr>
          {data.map((planetInfo, index) => (
            <tr key={ index }>
              {Object.values(planetInfo).map((e, index2) => (
                <td key={ index2 }>{e}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
