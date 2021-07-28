import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import Api from '../helpers/Api';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [arrayFiltrado, setArrayFiltrado] = useState([]);
  const [filters, setFilters] = useState({
    filterByName:
    { name: '' },
    filterByNumericValues: [],
  });

  useEffect(() => {
    async function requisitionApi() {
      setLoading(true);
      const ApiSave = await Api();
      setData(ApiSave);
      setNewData(ApiSave);
      setLoading(false);
    }
    requisitionApi();
  }, []);

  useEffect(() => {
    let newSaveData = newData;
    if (filters.filterByNumericValues.length > 0) {
      filters.filterByNumericValues.forEach((filter) => {
        switch (filter.comparison) {
        case 'maior que':
          newSaveData = newSaveData
            .filter((item) => parseInt(item[filter.column], 10) > filter.value);
          break;
        case 'menor que':
          newSaveData = newSaveData
            .filter((item) => parseInt(item[filter.column], 10) < filter.value);
          break;
        case 'igual a':
          newSaveData = newSaveData
            .filter((item) => parseInt(item[filter.column], 10) === filter.value);
          break;
        default:
          break;
        }
      });
      setNewData(newSaveData);
    }
  }, [filters]);

  return (
    <MyContext.Provider
      value={ {
        data,
        loading,
        setFilters,
        filters,
        arrayFiltrado,
        setArrayFiltrado,
        newData,
        setNewData,
      } }
    >
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
