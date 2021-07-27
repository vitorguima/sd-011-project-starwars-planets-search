/* eslint-disable array-callback-return */
import React from 'react';
import PropTypes from 'prop-types';
import getApi from '../componentes/GetApi';

const PlanetContext = React.createContext();

const PlanetProveider = ({ children }) => {
  const initial = {
    filterByName: '',
    filterByNumericValues: [],
  };

  const [data, setData] = React.useState([]);
  const [filters, setFilters] = React.useState(initial);

  const fetchData = async () => {
    const getPlanets = await getApi();
    setData(getPlanets);
  };

  const getDeletFilter = async (id) => {
    const getPlanets = await getApi();
    if (filters.filterByNumericValues.length > 1) {
      let array = [];
      filters.filterByNumericValues.filter((element) => {
        if (id !== element.column) {
          array = getPlanets.filter((elem) => {
            const { column, comparison, value } = element;
            if (comparison === 'maior que') {
              return elem[column] > +(value);
            }
            if (comparison === 'menor que') {
              return elem[column] < +(value);
            }

            return elem[column] === value;
          });
        }
      });
      console.log(array);
      setData(array);
    } else {
      fetchData();
    }
  };

  const deleteFilter = (e, index) => {
    const delFilter = filters.filterByNumericValues;
    const deletar = delFilter.filter((item, i) => index !== i);

    setFilters({
      ...filters,
      filterByNumericValues: deletar,
    });
    getDeletFilter(e.target.id);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const value = { data, filters, setFilters, setData, deleteFilter, getDeletFilter };

  return (
    <PlanetContext.Provider value={ value }>
      {children}

    </PlanetContext.Provider>
  );
};

PlanetProveider.propTypes = {
  children: PropTypes.object,
}.isRequired;

export { PlanetProveider, PlanetContext };
