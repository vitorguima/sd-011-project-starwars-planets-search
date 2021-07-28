import { useState, useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const useFilters = () => {
  const { data, filters, defaultColunsFilters } = useContext(PlanetsContext);
  const { results } = data;
  const {
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues,
    },
  } = filters;

  const [filteredPlanetList, setFilteredPlanetList] = useState([]);

  // Filtros filtrados são inicialmente atribuidos ao valor padrão das opções de filtros;
  const [
    filteredColumnFilters,
    setFilteredColumnFilters,
  ] = useState(defaultColunsFilters);

  useEffect(() => {
    filterByNumericValues.forEach((option) => {
      setFilteredPlanetList(
        results
          .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()))
          .filter((planet) => {
            switch (option.comparison) {
            case 'maior que':
              return (planet[option.column] > Number(option.value));
            case 'menor que':
              return (planet[option.column] < Number(option.value));
            case 'igual a':
              return (planet[option.column] === option.value);
            default:
              return true;
            }
          }),
      );
    });
  }, [filterByNumericValues, name, results]);

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

  return {
    filteredPlanetList, filteredColumnFilters,
  };
};

export default useFilters;
