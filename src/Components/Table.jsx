import React, { useContext, useEffect, useState } from 'react';
import Context from '../Context/Context';

export default function Table() {
  const { data,
    filterPlanets,
    setFilterPlanets,
  } = useContext(Context);
  const [storeFilterPlanets, setStoreFilterPlanets] = useState([]);
  const { name } = filterPlanets.filterByName;

  const filterNames = ({ target }) => {
    setFilterPlanets({
      ...filterPlanets,
      filterByName: { name: target.value },
    });
  };

  useEffect(() => {
    const getPlanetData = data.filter((planet) => planet
      .name.toLowerCase().includes(name));
    setStoreFilterPlanets(getPlanetData);
  }, [data, filterPlanets, name]);

  return (
    <>
      <h1>In the Table</h1>
      <label htmlFor="filter-label">
        Filtro:
        <input
          type="text"
          data-testid="name-filter"
          onChange={ filterNames }
        />
      </label>
      <thead>
        <tr>
          <th>Name</th>
          <th>Período de Rotação</th>
          <th>Período Orbital</th>
          <th>Diametro</th>
          <th>Clima</th>
          <th>Gravidade</th>
          <th>Terreno</th>
          <th>Água na Superfície</th>
          <th>População</th>
          <th>Filmes</th>
          <th>Criado</th>
          <th>Editado</th>
          <th>url</th>
        </tr>
      </thead>

      <tbody>
        {storeFilterPlanets.map((planets) => (
          <tr key={ planets.name }>
            <td>{planets.name}</td>
            <td>{planets.rotation_period}</td>
            <td>{planets.orbital_period}</td>
            <td>{planets.diameter}</td>
            <td>{planets.climate}</td>
            <td>{planets.gravity}</td>
            <td>{planets.terrain}</td>
            <td>{planets.surface_water}</td>
            <td>{planets.population}</td>
            <td>{planets.films}</td>
            <td>{planets.created}</td>
            <td>{planets.edited}</td>
            <td>{planets.url}</td>
          </tr>
        ))}
      </tbody>
    </>
  );
}
