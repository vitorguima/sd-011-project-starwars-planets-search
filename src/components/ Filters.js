import React, { useContext } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';
// Duvida: Não estou controlando o input de pesquisa dinamica e fazendo direto a alteração do provider. Correto isso?

// const context = {
//   data,
//   column,
//   comparison,
//   value,
//   filtered,
//   filters,
//   setData,
//   setName,
//   setColumn,
//   setComparison,
//   setValue,
//   setFiltered,
//   setFilters,
// };
//   filters:
//     {
//       filterByName: {
//         name: '',
//       },
//       filterByNumericValues: [
//         {
//           column: 'population',
//           comparison: 'maior que',
//           value: '100000',
//         },
//       ],
//     },
// };
// const MAIOR_QUE = 'maior que';
// const MENOR_QUE = 'menor que';
// const IGUAL_A = 'igual a';

export default function Filter() {
  const {
    data,
    column,
    comparison,
    value,
    // filtered,
    filters,
    // setData,
    setName,
    setColumn,
    setComparison,
    setValue,
    setFiltered,
    setFilters,
  } = useContext(PlanetsContext);

  function planetByInput(target) {
    setName(target.value);
    const planetsByInput = data.filter((planet) => (
      planet.name.toLowerCase().includes(target.value)
    ));
    setFiltered(planetsByInput);
  }
  // Primeiro - Criar um codigo que filtre a compinação. Ou seja, primeiro seta os valores que serao filtrados.
  // Extrair os filtros corretos. O ultimo que foi colocado. O filtro não pode sobrepor o que ja tem lah.
  // Uma vez separado o que será filtrado fazer função que monta esse filtro utilizando um map que utiliza os valores de filtro para fazer a seleção.
  // Apos feita a filtragem setar os filtered com a nova lista.

  function planetsByFilters() {
    const newFilters = {
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues, { column, comparison, value }],
    };

    setFilters(newFilters);
    console.log('Rodou ate setFilter');
    // if (filters.filterByNumericValues.length > 0) {
    //   const newfiltered = [];
    //   filters.forEach((filter) => {
    //     switch (filter.comparison) {
    //     case MAIOR_QUE:
    //       newfiltered.push(filtered.filter((planet) => planet[filter.column] > value));
    //       console.log('rodou maior');
    //       break;
    //     case MENOR_QUE:
    //       newfiltered.push(filtered.filter((planet) => planet[filter.column] < value));
    //       console.log('rodou menor');
    //       break;
    //     case IGUAL_A:
    //       newfiltered.push(filtered.filter((planet) => planet[filter.column] === value));
    //       console.log('rodou igual');
    //       break;
    //     default:
    //       newfiltered.push(filtered);
    //       console.log('Deu b.o no comparasion');
    //       break;
    //     }
    //   });
    //   setFiltered(newfiltered);
    // }
  }
  // function planetsByFilters() {
  //   const newFilters = {
  //     ...filters,
  //     filterByNumericValues: [
  //       ...filters.filterByNumericValues, { column, comparison, value }],
  //   };
  //   setFilters(newFilters);
  //   // Filtar novamente o data e setar novo filtered
  //   // let filteredListPlanets = [];
  //   filters.filterByNumericValues.forEach((filter, index) => {
  //     if (index > 0) {
  //       const result = filtered.map((planet) => {
  //         // planet[column] {`comparison`}
  //         // if (comparison === '>') planet[column] > value;
  //         switch (filter.comparison) {
  //         case MAIOR_QUE:
  //           return (planet[filter.column] > value);
  //         case MENOR_QUE:
  //           return planet[filter.column] < value;
  //         case IGUAL_A:
  //           return planet[filter.column] === value;
  //         default:
  //           console.log(`Erro no campo Comparison. Valor passado ${filter.comparison} ???`);
  //           return planet;
  //         }
  //       });
  //     }
  //     // filteredListPlanets.push(result);
  //   });
  //   let newFilteredListPlanets = [];
  //   filteredListPlanets.forEach((list) => {
  //     newFilteredListPlanets = [...newFilteredListPlanets, ...list];
  //   });
  //   setFiltered(newFilteredListPlanets);
  //   console.log(newFilteredListPlanets);
  // }

  // Planetas com x ><= Y
  function liCreator({ filterByNumericValues }) {
    const liList = filterByNumericValues.map((filter, index) => (
      <li key={ index }>
        {`${filter.column} ${filter.comparison} ${filter.value}`}
        <input type="button" value="X" />
      </li>
    ));
    return liList;
  }
  // Os filtros selecionados devem ser renderizados na tela depois do click.

  return (
    <section>
      <form>
        <label htmlFor="input_Filter">
          <input
            name="input_Filter"
            id="input_Filter"
            type="text"
            onChange={ ({ target }) => planetByInput(target) }
            placeholder="Search..."
            data-testid="name-filter"
          />
        </label>

        <br />
        <span>Filtro: </span>
        <select
          name="column-filter"
          htmlFor="column-filter"
          data-testid="column-filter"
          value={ null }
          onChange={ ({ target }) => setColumn(target.value) }
        >
          <option disabled selected>Selecione um valor</option>
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>

        <select
          id="comparison_filter"
          name="comparison_filter"
          data-testid="comparison-filter"
          value={ null }
          onChange={ ({ target }) => setComparison(target.value) }
        >
          <option disabled selected>Selecione um valor</option>
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>

        <input
          name="value_filter"
          id="value_filter"
          type="number"
          onChange={ ({ target }) => setValue(target.value) }
          placeholder="0"
          data-testid="value-filter"
        />
        <button
          type="button"
          onClick={ () => planetsByFilters() }
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
      { (filters.filterByNumericValues.length > 0)
        ? (
          <ul>
            {liCreator(filters)}
          </ul>
        )
        : null }
    </section>
  );
}
