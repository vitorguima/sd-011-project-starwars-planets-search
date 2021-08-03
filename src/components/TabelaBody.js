import React, { useContext } from 'react';
import TabelaContext from '../context/TabelaContext';

export default function TabelaBody() {
  const { data,
    userSelection,
    dropdown: { column, comparison, value },
  } = useContext(TabelaContext);

  const { filterByName: { name }, order: { sort, column: col } } = userSelection.filters;

  const filterByName = data
    .filter((planet) => planet.name.includes(name));

  const newFilter = filterByName.filter((planet) => {
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

  return (
    <tbody>
      { newFilter.map((planet, key) => (
        <tr key={ key }>
          <td data-testid="planet-name">{ planet.name }</td>
          { Object.keys(planet).slice(1)
            .map((k) => <td key={ k }>{ planet[k] }</td>) }
        </tr>
      ))}
    </tbody>
  );
}
