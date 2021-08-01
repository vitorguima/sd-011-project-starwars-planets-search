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

  function planetsFiltered() { // Muda "arrayPlanets" em tempo real conforme o prenchimento em FiltersForm.js
    const { results } = fetchSuccess;
    const { filterByName: { name } } = filters;

    const arrayPlanets = results && results.filter( // Mudar para "let" quando add + filtros
      (planet) => ( // Adaptar
        (planet.name.includes(name))
        // || (planet.subtitle.includes(searchText))
        // || (planet.storyline.includes(searchText))
      ),
    );

    // if (selectedGenre !== '') { // Adaptar a outro filtro pedido
    //   arrayPlanets = arrayPlanets.filter((item) => (
    //     (item.genre === selectedGenre)));
    // }

    // if (bookmarkedOnly) { // // Adaptar a outro filtro pedido
    //   arrayPlanets = arrayPlanets.filter((item) => (
    //     (item.bookmarked === true)));
    // }

    // return arrayPlanets;
    setChoosenPlanets(arrayPlanets); // Muda array "choosenPlanets" que passa ser renderizado em Table.js
  }

  useEffect(planetsFiltered, [filters]); // Atualiza array (choosenPlanets) cada vez que muda algo em "filters"

  const context = {
    fetchSuccess, // Provisório, śo pra testar componentes controlados antes de ajeitar o array  'choosenPlanets'
    filters, // Usado e, FiltersForm.js
    setFilters, // Usado e, FiltersForm.js
    choosenPlanets, // Esse que deve ser renderizado no em Table.js AGORA.
    fetchError, // Talvez use (Opcional)
    isFetching, // Talvez use (Opcional)
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
