import React, { useContext } from 'react';
import AppContext from './AppContext';
import TableBody from './TableBody';

const BEFORE = -1;
const AFTER = 1;

function transformNumber(original) {
  const transformed = Number(original);

  if (Number.isNaN(transformed)) {
    return original;
  }

  return transformed;
}

function compareNumber(comparison, a, b) {
  if (comparison === 'maior que') {
    return a > b;
  }

  if (comparison === 'menor que') {
    return a < b;
  }

  return a === b;
}

function caseInsensitiveIncludes(a, b) {
  return a.toLowerCase().includes(b.toLowerCase());
}

export default function Table() {
  const { data, filters, order } = useContext(AppContext);
  const { filterByName, filterByNumericValues } = filters;

  if (!data) {
    return null;
  }

  let filtered = data;

  if (filterByName.name) {
    filtered = filtered.filter((planet) => {
      const result = caseInsensitiveIncludes(planet.name, filterByName.name);
      return result;
    });
  }

  filterByNumericValues.forEach(({ comparison, column, value }) => {
    filtered = filtered.filter((planet) => {
      const result = compareNumber(comparison, Number(planet[column]), value);
      return result;
    });
  });

  const sortedData = order
    ? filtered.sort((planetA, planetB) => {
      const valueA = transformNumber(planetA[order.column]);
      const valueB = transformNumber(planetB[order.column]);

      if (valueA > valueB) {
        return order.sort === 'asc' ? AFTER : BEFORE;
      }

      return order.sort === 'asc' ? BEFORE : AFTER;
    })
    : filtered;

  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>rotation_period</th>
          <th>orbital_period</th>
          <th>diameter</th>
          <th>climate</th>
          <th>gravity</th>
          <th>terrain</th>
          <th>surface_water</th>
          <th>population</th>
          <th>films</th>
          <th>created</th>
          <th>edited</th>
          <th>url</th>
        </tr>
      </thead>
      <TableBody sortedData={ sortedData } />
    </table>
  );
}
