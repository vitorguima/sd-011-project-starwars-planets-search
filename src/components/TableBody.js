import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

export default function TableBody() {
  const {
    data,
    userSelection,
    dropdown: { column, comparison, value },
  } = useContext(TableContext);
  const { filterByName: { name }, order: { sort, column: col } } = userSelection.filters;

  const filterByName = data
    .filter((planet) => planet.name.includes(name));

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
  }).sort((planetA, planetB) => {
    const options = { numeric: true };
    if (sort === 'ASC') {
      return new Intl.Collator(undefined, options).compare(planetA[col], planetB[col]);
    }
    if (sort === 'DESC') {
      return new Intl.Collator(undefined, options).compare(planetB[col], planetA[col]);
    }
    return 0;
  });

  // console.log(finalFilter.sort((a, b) => {
  //   if (a[column] < b[column]) {
  //     return -1;
  //   }
  //   if (a[column] > b[column]) {
  //     return 1;
  //   }
  //   return 0;
  // }));

  return (
    <tbody>
      { finalFilter.map((planet, key) => (
        <tr key={ key }>
          <td data-testid="planet-name">{ planet.name }</td>
          { Object.keys(planet).slice(1)
            .map((k) => <td key={ k }>{ planet[k] }</td>) }
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
