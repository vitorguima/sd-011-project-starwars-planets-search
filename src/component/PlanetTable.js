import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function App() {
  const { headers,
    data,
    filterByName,
    filterByNumericValues,
  } = useContext(PlanetsContext);

  const filterPlanetsInput = data
    .filter((planet) => planet.name.includes(filterByName));

  const filterPlanetsSelect = filterPlanetsInput;

  console.log(filterByNumericValues);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((info) => <th key={ info }>{info.toUpperCase()}</th>)}
        </tr>
      </thead>
      <tbody>
        {filterPlanetsSelect.map((planet) => {
          const infoPlanet = Object.values(planet);
          return (
            <tr key={ infoPlanet[0] }>
              {infoPlanet
                .map((info) => <td key={ info }>{info}</td>)}
            </tr>);
        })}
      </tbody>
    </table>
  );
}

export default App;

// Exemplo para uso no filtro:

// let filterMovies = movies.filter((movie) => (
//   movie.title.toLowerCase().includes(searchText.toLowerCase())
//   || movie.subtitle.toLowerCase().includes(searchText.toLowerCase())
//   || movie.storyline.toLowerCase().includes(searchText.toLowerCase())
// ));
