import React, { useContext } from 'react';
import Context from '../Context/Context';

const Columns = () => {
  const { data,
    filters: { filterByName: { name: planetName }, filterByNumericValues },
  } = useContext(Context);
  if (data.length === 0) return <p>loading...</p>;
  console.log('planetName', planetName);
  return (
    <div>
      {data.length > 0 && data.filter((planet) => planet.name
        .includes(planetName)).filter(({ ...rest }) => {
        let result = true;
        filterByNumericValues.forEach(({ column, comparison, value }) => {
          switch (comparison) {
          case 'maior que':
            result = result && (Number(rest[column]) > Number(value));
            break;
          case 'menor que':
            result = result && (Number(rest[column]) < Number(value));
            break;
          case 'igual a':
            result = result && (Number(rest[column]) === Number(value));
            break;
          default:
            result = false;
          }
        });
        return result;
      }).map(({ climate,
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
