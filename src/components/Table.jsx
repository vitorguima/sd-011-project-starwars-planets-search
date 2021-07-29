import React from 'react';
import Context from '../context/Context';

const Table = () => {
  const { data, filterName: { filters } } = React.useContext(Context);

  if (data.length === 0) return <div>Loading...</div>;
  // como o array vazio é Truthy preciso usar o length para verificar se foi preenchido ou não

  let filteredPlanets = []; // array que receberá as filtragens
  filteredPlanets = data.filter((planet) => planet.name
    .toLowerCase().includes(filters.filterByName.name.toLowerCase()));
  // vídeo que ajudou com o racional do filtro https://www.youtube.com/watch?v=5Tq4-UgPTDs

  const { comparison, column, value } = filters.filterByNumericValues[0];
  // para filtrar de acordo com as comparações busco o primeiro filterByNumericValues e monto as condições de filtragem, inserindo no tbody para que a filtragem ocorra pelo nome e pelos filtros direto na tabela

  if (comparison === 'maior que' && value !== 0) {
    filteredPlanets = filteredPlanets
      .filter((planet) => parseFloat(planet[column]) > parseFloat(value));
  }
  if (comparison === 'menor que' && value !== 0) {
    filteredPlanets = filteredPlanets
      .filter((planet) => parseFloat(planet[column]) < parseFloat(value));
  }
  if (comparison === 'igual a' && value !== 0) {
    filteredPlanets = filteredPlanets
      .filter((planet) => parseFloat(planet[column]) === parseFloat(value));
  }

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0])
            .filter((th) => th !== 'residents')
            .map((planets, index) => (<th key={ index }>{planets}</th>))}
        </tr>
      </thead>
      <tbody>
        { filteredPlanets.map((planet, index) => (
          <tr key={ index }>
            <td>{ planet.name }</td>
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
            <td>{ planet.url }</td>
          </tr>
        ))}
      </tbody>
    </table>

  );
};
export default Table;
