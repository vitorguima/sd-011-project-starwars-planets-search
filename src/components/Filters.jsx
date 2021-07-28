import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import DeleteFiltersBtn from './DeleteFiltersBtn';
import useFilters from '../hooks/useFilters';

const Filters = () => {
  const { filteredColumnFilters } = useFilters();

  const {
    setFilterByName,
    addNewNumericFilter,
    changeSortValue,
  } = useContext(PlanetsContext);

  const [isDisabled, setIsDisabled] = useState(false);

  // Estado criado para capturar os valores dos filtros escolhidos em cada select;
  const [filterSelectedValues, setFilterSelectedValues] = useState({
    column: filteredColumnFilters[0],
    comparison: 'maior que',
    value: 0,
  });

  const [selectedSortValues, setSelectedSortValues] = useState({
    column: 'name',
    sort: 'ASC',
  });

  useEffect(() => {
    if (filteredColumnFilters.length === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [filteredColumnFilters]);

  // Função handleFilterSelects atualiza o estado filterSelectedValues conforme o usuário escolhe o select;
  const handleFilterSelects = ({ target }) => {
    const { name, value } = target;

    setFilterSelectedValues({
      ...filterSelectedValues,
      [name]: value,
    });
  };

  const handleSortFilterSelect = ({ target }) => {
    const { name, value } = target;

    setSelectedSortValues({
      ...selectedSortValues,
      [name]: value,
    });
  };

  // Envia para o context os filtros escolhidos pelo usuário;
  const submitFilter = () => {
    addNewNumericFilter(filterSelectedValues);
    setFilterSelectedValues({
      column: filteredColumnFilters[1],
      comparison: 'maior que',
      value: 0,
    });
  };

  // Desestruturação do estado local filterSelectedValues criado para ser possível ter os valores do selectes controlados juntamente com o valor presente no estado local;
  const { column, comparison, value: filterValue } = filterSelectedValues;

  return (
    <>
      <form>
        <label htmlFor="name-filter">
          Filtre um planeta pelo nome:
          <input
            data-testid="name-filter"
            id="name-filter"
            onChange={ ({ target: { value } }) => setFilterByName(value) }
            placeholder="Digite o nome de um planeta"
            type="text"
          />
        </label>
      </form>
      <form>
        <label htmlFor="column-filter">
          <select
            data-testid="column-filter"
            id="column-filter"
            name="column"
            onChange={ handleFilterSelects }
            value={ column }
          >
            {
              filteredColumnFilters.map((option, index) => (
                <option key={ index }>{ option }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="comparison-filter">
          <select
            data-testid="comparison-filter"
            id="comparison-filter"
            name="comparison"
            onChange={ handleFilterSelects }
            value={ comparison }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          <input
            data-testid="value-filter"
            id="value-filter"
            min="0"
            type="number"
            name="value"
            onChange={ handleFilterSelects }
            value={ filterValue }
          />
        </label>
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => submitFilter() }
          disabled={ isDisabled }
        >
          Filtrar
        </button>
      </form>
      <form>
        <label htmlFor="column-sort">
          Ordenar a coluna:
          <select
            data-testid="column-sort"
            id="column-sort"
            name="column"
            onChange={ handleSortFilterSelect }
          >
            <option value="name">Nome</option>
            <option value="rotation_period">Período de Rotação</option>
            <option value="orbital_period">Período Orbital</option>
            <option value="diameter">Diâmetro</option>
            <option value="climate">Clima</option>
            <option value="gravity">Gravidade</option>
            <option value="terrain">Terreno</option>
            <option value="surface_water">Água de Superfície</option>
            <option value="population">População</option>
            <option value="films">Filmes</option>
            <option value="created">Criado</option>
            <option value="edited">Editado</option>
            <option value="url">URL</option>
          </select>
        </label>
        <label htmlFor="sort">
          Por valores:
          <label htmlFor="column-sort-input-asc">
            Crescente
            <input
              id="column-sort-input-asc"
              data-testid="column-sort-input-asc"
              name="sort"
              onChange={ handleSortFilterSelect }
              type="radio"
              value="ASC"
            />
          </label>
          <label htmlFor="column-sort-input-desc">
            Decrescente
            <input
              id="column-sort-input-desc"
              data-testid="column-sort-input-desc"
              name="sort"
              onChange={ handleSortFilterSelect }
              type="radio"
              value="DESC"
            />
          </label>
        </label>
        <button
          data-testid="column-sort-button"
          onClick={ () => changeSortValue(selectedSortValues) }
          type="button"
        >
          Ordenar
        </button>
      </form>
      <DeleteFiltersBtn />
    </>
  );
};

export default Filters;
