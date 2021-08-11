import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function RenderBody() {
  const { data, selectFilter, filterNumeric } = useContext(PlanetsContext);
  const { filterByName: { name: filterName },
    filterByNumericValues,
    order: { sort, column: col } } = selectFilter.filters;
  const arrayFiltered = data.filter(({ name }) => name.includes(filterName));

  const finalFilter = arrayFiltered.filter((planet) => {
    if (filterByNumericValues.length === 0) return true;

    const nPlanet = Number(planet[filterNumeric.column]);
    const nValue = Number(filterNumeric.value);

    return {
      'maior que': nPlanet > nValue,
      'menor que': nPlanet < nValue,
      'igual a': nPlanet === nValue,
    }[filterNumeric.comparison];
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
  console.log(finalFilter);
  return (
    <tbody>
      { finalFilter.map(({
        name,
        rotation_period: rotation,
        orbital_period: orbital,
        diameter,
        climate,
        gravity,
        terrain,
        surface_water: water,
        population,
        films,
        created,
        edited,
        url,
      }) => (
        <tr key={ name }>
          <td data-testid="planet-name">{name}</td>
          <td>{rotation}</td>
          <td>{orbital}</td>
          <td>{diameter}</td>
          <td>{climate}</td>
          <td>{gravity}</td>
          <td>{terrain}</td>
          <td>{water}</td>
          <td>{population}</td>
          <td>{films}</td>
          <td>{created}</td>
          <td>{edited}</td>
          <td>{url}</td>
        </tr>)) }
    </tbody>
  );
}
