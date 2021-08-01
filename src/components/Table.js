import React, { useContext, useEffect } from 'react';
import planetListContext from '../planetListContext';
import fetchPlanetsAPI from '../API';

const exibeResultado = (lista) => lista.map((line, index) => (
  <tr key={ index }>
    <td>
      {line.name}
    </td>
    <td>
      {line.rotation_period}
    </td>
    <td>
      {line.orbital_period}
    </td>
    <td>
      {line.diameter}
    </td>
    <td>
      {line.climate}
    </td>
    <td>
      {line.gravity}
    </td>
    <td>
      {line.terrain}
    </td>
    <td>
      {line.surface_water}
    </td>
    <td>
      {line.population}
    </td>
    <td>
      {line.films}
    </td>
    <td>
      {line.created}
    </td>
    <td>
      {line.edited}
    </td>
    <td>
      {line.url}
    </td>
  </tr>));

const aplicaFiltro = (filtro, listaDeEntrada) => {
  let list = [];

  if (filtro.comparison === 'maior que') {
    list = listaDeEntrada.filter((item) => parseInt(item[filtro.column], 10)
    > parseInt(filtro.value, 10));
  }
  if (filtro.comparison === 'menor que') {
    list = listaDeEntrada.filter((item) => item[filtro.column] <= filtro.value);
  }
  if (filtro.comparison === 'igual a') {
    list = listaDeEntrada.filter((item) => item[filtro.column] === filtro.value);
  }

  return list;
};

const filtraPeloNome = (nome, nomeAlvo) => nome
  .toLowerCase()
  .includes(nomeAlvo.toLowerCase());

const filtraResultados = (resultados, nomeBuscado, arrayDeFiltrosDeNumeros) => {
  const valoresFiltrados = resultados.filter(
    (item) => filtraPeloNome(item.name, nomeBuscado),
  );

  let lista = valoresFiltrados;
  for (let i = 0; i < arrayDeFiltrosDeNumeros.length; i += 1) {
    const resultadoDoFiltro = aplicaFiltro(arrayDeFiltrosDeNumeros[i], lista);
    lista = resultadoDoFiltro;
  }

  return lista;
};

// const tiraOptionSelecionada = (filterByNumericValues) => {
//   const selected = document.getElementById('column-filter');
//   if (selected.value === filterByNumericValues.column) {
//     document.getElementById(filterByNumericValues.column).setAttribute('disable');
//   }
// };

const criaNovoFiltro = (objeto, setaNovoObjeto) => {
  setaNovoObjeto(
    (prevState) => ([...prevState, objeto]),
  );
  // tiraOptionSelecionada(filterByNumericValues);
};

function Table() {
  const { data, setData } = useContext(planetListContext);
  const { nameFilter, setNameFilter } = useContext(planetListContext);
  const { filterByNumericValues,
    setFilterByNumericValues } = useContext(planetListContext);
  const { arrayDeFiltrosDeNumeros,
    setArrayDeFiltrosDeNumeros } = useContext(planetListContext);
  const getData = () => {
    const dataReceived = fetchPlanetsAPI(setData);

    return dataReceived;
  };

  const camposComFiltro = arrayDeFiltrosDeNumeros.map((item) => item.column);

  useEffect(getData, []);
  const todosOsDados = data;

  const valoresPraExibir = filtraResultados(
    todosOsDados,
    nameFilter,
    arrayDeFiltrosDeNumeros,
  );

  const tabelaDeValores = exibeResultado(valoresPraExibir);
  return (
    <div name="form">
      <label htmlFor="name-filter">
        Busca por nome
        <input
          type="text"
          data-testid="name-filter"
          id="name-filter"
          onChange={ ({ target }) => setNameFilter(target.value) }
        />
      </label>

      <select
        data-testid="column-filter"
        onChange={ ({ target }) => setFilterByNumericValues(
          (prevState) => ({ ...prevState, column: target.value }),
        ) }
        id="column-filter"
      >
        {camposComFiltro.includes('population')
          ? null
          : <option value="population">population</option>}
        {camposComFiltro.includes('orbital_period')
          ? null
          : <option value="orbital_period">orbital_period</option>}

        {camposComFiltro.includes('diameter')
          ? null
          : <option value="diameter">diameter</option>}

        {camposComFiltro.includes('rotation_period')
          ? null
          : <option value="rotation_period">rotation_period</option>}
        {camposComFiltro.includes('surface_water')
          ? null
          : <option value="surface_water">surface_water</option>}
      </select>

      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => setFilterByNumericValues(
          (prevState) => ({ ...prevState, comparison: target.value }),
        ) }
      >
        <option>comparison</option>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <label htmlFor="value-filter">
        <input
          type="number"
          data-testid="value-filter"
          id="value-filter"
          onChange={ ({ target }) => setFilterByNumericValues(
            (prevState) => ({ ...prevState, value: target.value }),
          ) }
        />
      </label>

      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => criaNovoFiltro(
          filterByNumericValues, setArrayDeFiltrosDeNumeros,
        ) }
      >
        Filtrar

      </button>

      <table className="table">
        <thread>
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

          <tbody>
            {tabelaDeValores}
          </tbody>

        </thread>
      </table>
    </div>
  );
}

export default Table;
