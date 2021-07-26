import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const { data } = useContext(PlanetsContext);
  const [filters, setFilters] = useState(
    { filterByName: { name: '' },
      filterByNumericValues: [
        {
          column: '',
          comparison: '',
          value: '',
        },
      ],
    },
  );

  const handleInputContent = ({ target }) => {
    setFilters(
      { ...filters, filterByName: { name: target.value } },
    );
  };

  const filterPlanets = data.filter((item) => (
    item.name.toLowerCase().includes(filters.filterByName.name)));

  return (
    <table>
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

      <input
        type="text"
        value={ filters.filterByName.name }
        onChange={ handleInputContent }
        data-testid="name-filter"
      />

      {data
        && filterPlanets.map((item) => (
          <tr key={ `${item.name}` }>
            {Object.values(item).map((value, index) => (
              value === item.name ? (
                <td key={ `${value} ${index}` } data-testid="planet-name">
                  {value}
                </td>
              ) : (
                <td key={ `${value} ${index}` }>{value}</td>
              )))}
          </tr>
        ))}

    </table>
  );
}
