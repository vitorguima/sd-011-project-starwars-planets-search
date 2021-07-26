import React, { useContext } from 'react';
import Context from '../Context/Context';

const Columns = () => {
  const { data, filters: { filterByName: { name: planetName } } } = useContext(Context);
  if (data.length === 0) return <p>loading...</p>;
  console.log('planetName', planetName);
  return (
    <div>
      {data.length > 0 && data.filter((planet) => planet.name
        .includes(planetName)).map(({ climate,
        created,
        diameter,
        edited,
        films,
        gravity,
        name,
        orbital_period: orbitalPeriod,
        population,
        rotation_period: rotationPeriod,
        surface_water: surfaceWater,
        terrain,
        url },
      index) => (
        <tr
          key={ index }
        >
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
        </tr>))}

    </div>
  );
};

export default Columns;
