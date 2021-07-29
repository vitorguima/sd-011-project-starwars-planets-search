import React, { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsContext';
import Loading from './Loading';
import './Table.css';
import Filters from './Filters';

function Table() {
  const { data, gotInfo } = useContext(StarWarsContext);
  return !gotInfo ? (
    <Loading />
  ) : (
    <div>
      <Filters />
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
