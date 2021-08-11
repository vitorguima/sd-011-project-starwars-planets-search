import React, { useContext } from 'react';
import AppContext from '../Context/AppContext';

function TableBody() {
  const {
    planets,
    planetFiltered,
    dropFilter,
    filter,
  } = useContext(AppContext);

  const { sort, column } = filter.order;
  let render = planets.sort((a, b) => (a[column]).localeCompare(b[column]));
  // console.log(column);
  if (sort === 'DESC') {
    render.sort((b, a) => a[column] - b[column]);
  } else {
    render.sort((a, b) => a[column] - b[column]);
  }
  // console.log(render);

  if (planetFiltered.length > 0) {
    render = planetFiltered;
  }

  if (dropFilter.length > 0) {
    render = dropFilter;
  }

  if (planetFiltered.length === 0 && dropFilter.length === 0) {
    render = planets;
  }

  return (
    render.map((data, index) => (
      <tr key={ index }>
        <td data-testid="planet-name">{data.name}</td>
        <td>{data.rotation_period}</td>
        <td>{data.orbital_period}</td>
        <td>{data.diameter}</td>
        <td>{data.climate}</td>
        <td>{data.gravity}</td>
        <td>{data.terrain}</td>
        <td>{data.surface_water}</td>
        <td>{data.population}</td>
        <td>{data.films}</td>
        <td>{data.created}</td>
        <td>{data.edited}</td>
        <td>{data.url}</td>
      </tr>
    ))
  );
}

export default TableBody;
