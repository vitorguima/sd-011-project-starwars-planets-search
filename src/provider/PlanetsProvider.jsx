import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchApiStarWarsPlanets from '../services/FetchApiStarWarsPlanets';
import PlanetsContext from '../context/PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState('ASC');
  const [column, setColumn] = useState('name');

  const [filterNumeric, setFilterNumeric] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

  const [selectFilter, setSelectFilter] = useState(
    {
      filters: {
        filterByName: {
          name: '',
        },
        filterByNumericValues: [],
        order: {
          column: 'Name',
          sort: 'ASC',
        },
      },
    },
  );

  async function getFetchApiStarWarsPlanets() {
    const planets = await fetchApiStarWarsPlanets();
    setData(data.concat(planets));
  }

  useEffect(() => {
    getFetchApiStarWarsPlanets();
  }, []);

  const handleFilterName = ({ target }) => {
    setSelectFilter({
      filters: {
        ...selectFilter.filters,
        filterByName: { name: target.value },
      },
    });
  };

  const handleFilterNumericValues = ({ target }) => {
    const { name, value } = target;
    setFilterNumeric({
      ...filterNumeric,
      [name]: value,
    });
  };

  const addFilter = () => {
    setSelectFilter({
      filters: {
        ...selectFilter.filters,
        filterByNumericValues: [
          ...selectFilter.filters.filterByNumericValues,
          filterNumeric,
        ],
      },
    });
  };

  const removeFilter = (selectColumn) => {
    const { filterByNumericValues } = selectFilter.filters;
    setSelectFilter({
      filters: {
        ...selectFilter.filters,
        filterByNumericValues: [
          filterByNumericValues
            .filter((numericValues) => numericValues.column !== selectColumn),
        ],
      },
    });
  };

  const handleColumnNameChange = ({ target }) => setColumn(target.value);

  const handleRadioOrderChange = ({ target }) => setOrder(target.value);

  const handleColumnOrderChange = () => {
    setSelectFilter({
      filters: {
        ...selectFilter.filters,
        order: {
          column,
          sort: order,
        },
      },
    });
  };

  useEffect(() => handleColumnOrderChange(), []);

  return (
    <PlanetsContext.Provider
      value={ {
        data,
        selectFilter,
        removeFilter,
        filterNumeric,
        handleFilterName,
        handleColumnNameChange,
        handleRadioOrderChange,
        handleColumnOrderChange,
        handleFilterNumericValues,
        addFilter,
      } }
    >
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
