import React, { useEffect, useState } from 'react';
import PlanetsContext from './contexts/PlanetsContext';
import './App.css';
import Table from './components/Table';
import FiltersForm from './components/FiltersForm';

// Falta, também, criar um compponente de campo de Buscar, igual MovieLibrary stantful

const STARWAR_PLANETS = 'https://swapi-trybe.herokuapp.com/api/planets/?format=json'; // Teste Local

function App() {
  // [ REFERÊNCIAS p/ ESTADOS]:
  // const { movies, searchText, bookmarkedOnly, selectedGenre } = this.state;
  const [choosenPlanets, setChoosenPlanets] = useState([]); // Recebe os resultados dos filtros
  const [fetchSuccess, setFetchSuccess] = useState({}); // Recebe retorno OK da API. Equivale ao movies
  const [fetchError, setFetchError] = useState(''); // Recebe retorno Erro da API
  const [isFetching, setisFetching] = useState(true); // Para controlar um componente "Loading" durante query a API
  const [filters, setFilters] = useState({ // Suas chaves equivalem a campos controlados:
    filterByName: {
      name: '',
      // Outro: algo,
    },
    // filterByNumericValues: [
    //   {
    //     column: 'population',
    //     comparison: 'maior que',
    //     value: '100000',
    //   },
    // ],
  });

  function fetchAPI() { // Implementação da requisição para API.
    const fetchPlanets = () => {
      setisFetching(true); // Implemtar depois no DOM
      return fetch(STARWAR_PLANETS)
        .then((response) => response.json()
          .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));
    };
    setisFetching(false); // Implemtar depois no DOM
    fetchPlanets().then((success) => setFetchSuccess(success))
      .catch((error) => setFetchError(error));
  }

  useEffect(fetchAPI, []); // Execução da requisição à API.

  useEffect(() => { // Verificar se estado de App.js muda por componente controlado em FiltersForm.js
    console.log('Abaixo o contexto provido por App.js:');
    console.log(filters.filterByName.name);
  }, [filters]);

  // function planetsFiltered() { // Modificar
  //   let arrayPlanets = fetchSuccess.filter((item) => ( // Adaptar
  //     (item.title.includes(searchText))
  //     || (item.subtitle.includes(searchText))
  //     || (item.storyline.includes(searchText))));

  //   if (selectedGenre !== '') { // Adaptar
  //     arrayPlanets = arrayPlanets.filter((item) => (
  //       (item.genre === selectedGenre)));
  //   }

  //   if (bookmarkedOnly) { // Adaptar
  //     arrayPlanets = arrayPlanets.filter((item) => (
  //       (item.bookmarked === true)));
  //   }

  //   // return arrayPlanets;
  //   setChoosenPlanets(arrayPlanets);
  // }

  // useEffect(planetsFiltered, [filters]); // Atualiza array de filmes filtrados: choosenPlanets.

  const context = {
    fetchSuccess, // Provisório, śo pra testar componentes controlados antes de ajeitar o array  'choosenPlanets'
    filters,
    setFilters,
    choosenPlanets,
    fetchError,
    isFetching,
  };

  return (
    <div>
      <PlanetsContext.Provider value={ context }>
        <FiltersForm />
        <Table />
      </PlanetsContext.Provider>
    </div>
  );
}

export default App;
