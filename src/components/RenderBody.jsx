import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function RenderBody() {
  const { data, selectFilter } = useContext(PlanetsContext);
  const { name: filterName } = selectFilter.filters.filterByName;

  const arrayFilterName = data.filter(({ name }) => name.includes(filterName));

  return (
    <tbody>
      { arrayFilterName.map(({
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
          <td>{name}</td>
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
