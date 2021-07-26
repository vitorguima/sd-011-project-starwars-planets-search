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

export default function Filter() {
  const {
    data,
    // column,
    // comparison,
    // valueNumber = value,
    // filtered,
    // filters,
    // setData,
    setName,
    // setColumn,
    setComparison,
    setValue,
    setFiltered,
    // setFilters,
  } = useContext(PlanetsContext);

  function planetByInput(target) {
    setName(target.value);
    const byInputPlanets = data.filter((planet) => (
      planet.name.toLowerCase().includes(target.value)
    ));
    setFiltered(byInputPlanets);
  }
  // Primeiro - Criar um codigo que filtre a compinação. Ou seja, primeiro seta os valores que serao filtrados.
  // Extrair os filtros corretos. O ultimo que foi colocado. O filtro não pode sobrepor o que ja tem lah.
  // Uma vez separado o que será filtrado fazer função que monta esse filtro utilizando um map que utiliza os valores de filtro para fazer a seleção.
  // Apos feita a filtragem setar os filtered com a nova lista.

  // Montar função que adiciona um novo filtro. Essa mesma função deve adicionar um novo filtered.
  // function planetByFilters() {
  //   const { filterByNumericValues } = filters;
  //   const byFilterPlanets = data.
  //   setFiltered();
  // }

  return (
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
        // onChange={ ({ target }) => setColumn([]) }
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
        onChange={ ({ target: { value } }) => setComparison(value) }
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
        onChange={ ({ target: { value } }) => setValue(value) }
        placeholder="0"
        data-testid="value-filter"
      />
      <input
        type="button"
        value="Filtrar"
        // onClick={ planetByFilters }
        data-testid="button-filter"
      />
    </form>
  );
}
