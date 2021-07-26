import React, { useEffect, useState } from 'react';

function Table() {
  const [planets, setPlanets] = useState([]);
  const [headTable, setHeadTable] = useState('');
  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((data) => data.json());
      setPlanets(results);
      setHeadTable(Object.keys(results[0]));
    };
    getPlanets();
  }, []);

  return (
    <table>
      <tr>
        <th>{headTable[0]}</th>
        <th>{headTable[1]}</th>
        <th>{headTable[2]}</th>
        <th>{headTable[3]}</th>
        <th>{headTable[4]}</th>
        <th>{headTable[5]}</th>
        <th>{headTable[6]}</th>
        <th>{headTable[7]}</th>
        <th>{headTable[8]}</th>
        <th>{headTable[10]}</th>
        <th>{headTable[11]}</th>
        <th>{headTable[12]}</th>
        <th>{headTable[13]}</th>
      </tr>

      { planets.map(({ name,
        rotation_period: rotationPeriod,
        orbital_period: orbitalPeriod,
        diameter,
        climate, gravity, terrain, population,
        surface_water: surfaceWater, films,
        created, edited, url }, index) => (
        <tbody key={ index }>
            <tr>
            <td>
                {name}
              </td>
            <td>
                {rotationPeriod}
              </td>
            <td>
                {orbitalPeriod}
              </td>
            <td>
                {diameter}
              </td>
            <td>
                {climate}
              </td>
            <td>
                {gravity}
              </td>
            <td>
                {terrain}
              </td>
            <td>
                {surfaceWater}
              </td>
            <td>
                {population}
              </td>
            <td>
                {films}
              </td>
            <td>
                {created}
              </td>
            <td>
                {edited}
              </td>
            <td>
                {url}
              </td>
          </tr>
          </tbody>
      ))}
    </table>
  );
}

export default Table;
