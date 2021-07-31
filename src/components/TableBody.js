import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

export default function TableBody() {
  const {
    data,
    userSelection,
    dropdown: { column, comparison, value },
  } = useContext(TableContext);
  const { name } = userSelection.filters.filterByName;

  const filterByName = data.filter((planet) => planet.name.includes(name));
  const finalFilter = filterByName.filter((planet) => {
    const { filterByNumericValues } = userSelection.filters;

    if (filterByNumericValues.length === 0) return true;

    const nPlanet = Number(planet[column]);
    const nValue = Number(value);

    return {
      'maior que': nPlanet > nValue,
      'menor que': nPlanet < nValue,
      'igual a': nPlanet === nValue,
    }[comparison];
  });

  return (
    <tbody>
      { finalFilter.map((planet, key) => (
        <tr key={ key }>
          { Object.keys(planet).map((k) => <td key={ k }>{ planet[k] }</td>) }
          {/* <td>{ planet.name }</td>
          <td>{ planet.rotation_period }</td>
          <td>{ planet.orbital_period }</td>
          <td>{ planet.diameter }</td>
          <td>{ planet.climate }</td>
          <td>{ planet.gravity }</td>
          <td>{ planet.terrain }</td>
          <td>{ planet.surface_water }</td>
          <td>{ planet.population }</td>
          <td>{ planet.films }</td>
          <td>{ planet.created }</td>
          <td>{ planet.edited }</td>
          <td>{ planet.url }</td> */}
        </tr>
      ))}
    </tbody>
  );
}
