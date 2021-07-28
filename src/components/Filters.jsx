import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import DeleteFiltersBtn from './DeleteFiltersBtn';

const Filters = () => {
  const {
    setFilterByName,
    addNewNumericFilter,
    defaultColunsFilters,
    filters,
  } = useContext(PlanetsContext);

  // Filtros filtrados são inicialmente atribuidos ao valor padrão das opções de filtros;
  const [
    filteredColumnFilters,
    setFilteredColumnFilters,
  ] = useState(defaultColunsFilters);

  // Estado criado para capturar os valores dos filtros escolhidos em cada select;
  const [selectedValues, setSelectedValues] = useState({
    column: filteredColumnFilters[0],
    comparison: 'maior que',
    value: 0,
  });

  const [isDisabled, setIsDisabled] = useState(false);

  const {
    filters: {
      filterByNumericValues,
    },
  } = filters;

  // Realiza a filtragem das opções disponíveis conforme filtros forem sendo adicionados pelo usuário;
  // 1º Transforma as opções escolhidas em um array com o uso do .map();
  // 2º Ataliza os opções de filtro filtradas retirando desse array os valores escolhidos pelo usuário.
  useEffect(() => {
    const filterOptions = filterByNumericValues.map((options) => options.column);
    setFilteredColumnFilters(
      defaultColunsFilters
        .filter((columnFilter) => !filterOptions.includes(columnFilter)),
    );
  }, [filterByNumericValues, defaultColunsFilters]);

  useEffect(() => {
    if (filteredColumnFilters.length === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [filteredColumnFilters]);

  // Função handleSelects atualiza o estado selectedValues conforme o usuário escolhe o select;
  const handleSelects = ({ target }) => {
    const { name, value } = target;

    setSelectedValues({
      ...selectedValues,
      [name]: value,
    });
  };

  // Envia para o context os filtros escolhidos pelo usuário;
  const submitFilter = () => {
    addNewNumericFilter(selectedValues);
    setSelectedValues({
      column: filteredColumnFilters[1],
      comparison: 'maior que',
      value: 0,
    });
  };

  // Desestruturação do estado local selectedValues criado para ser possível ter os valores do selectes controlados juntamente com o valor presente no estado local;
  const { column, comparison, value: filterValue } = selectedValues;

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
            onChange={ handleSelects }
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
            onChange={ handleSelects }
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
            onChange={ handleSelects }
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
      <DeleteFiltersBtn />
    </>
  );
};

export default Filters;
