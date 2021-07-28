import { useState, useEffect, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import useFilters from './useFilters';

const useSort = () => {
  const { filters } = useContext(PlanetsContext);
  const { filteredPlanetList } = useFilters();

  const [planetListSorted, setPlanetListSorted] = useState([]);

  const {
    filters: {
      order,
    },
  } = filters;

  const sortByText = [
    'name',
    'climate',
    'gravity',
    'terrain',
    'films',
    'created',
    'edited',
    'url',
  ];

  const sortByNumber = [
    'rotation_period',
    'orbital_period',
    'diameter',
    'population',
  ];

  const oneLess = -1;

  useEffect(() => {
    if (
      filteredPlanetList
      && order.sort === 'ASC'
      && sortByText.includes(order.column)
    ) {
      return (
        setPlanetListSorted(
          filteredPlanetList
            .sort((a, b) => {
              if (a[order.column] > b[order.column]) {
                return 1;
              } if (a[order.column] < b[order.column]) {
                return oneLess;
              }
              return 0;
            }),
        )
      );
    }
  }, [filteredPlanetList, order, sortByNumber, sortByText, oneLess]);

  useEffect(() => {
    if (
      filteredPlanetList
      && order.sort === 'ASC'
      && sortByNumber.includes(order.column)
    ) {
      return (
        setPlanetListSorted(
          filteredPlanetList
            .sort((a, b) => Number(a[order.column]) - Number(b[order.column])),
        )
      );
    }
  }, [filteredPlanetList, order, sortByNumber]);

  useEffect(() => {
    if (filteredPlanetList
      && order.sort === 'DESC'
      && sortByText.includes(order.column)
    ) {
      return (
        setPlanetListSorted(
          filteredPlanetList
            .sort((a, b) => {
              if (a[order.column] > b[order.column]) {
                return oneLess;
              } if (a[order.column] < b[order.column]) {
                return 1;
              }
              return 0;
            }),
        )
      );
    }
  }, [filteredPlanetList, order, oneLess, sortByText]);

  useEffect(() => {
    if (filteredPlanetList
      && order.sort === 'DESC'
      && sortByNumber.includes(order.column)
    ) {
      return (setPlanetListSorted(
        filteredPlanetList
          .sort((a, b) => Number(b[order.column]) - Number(a[order.column])),
      ));
    }
  }, [filteredPlanetList, order, sortByNumber]);

  return {
    planetListSorted,
  };
};

export default useSort;
