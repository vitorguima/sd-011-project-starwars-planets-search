import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import Api from '../helpers/Api';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [vazio, setVazio] = useState('');
  const [newData, setNewData] = useState([]);
  const [loading, setLoading] = useState(false);
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
    // function teste() {
    let newSaveData = newData;
    if (filters.filterByNumericValues.length > 0) {
      filters.filterByNumericValues.forEach((filter) => {
        switch (filter.comparison) {
        case 'igual a':
          newSaveData = newSaveData
            .filter((item) => parseInt(item[filter.column], 10)
            === parseInt(filter.value, 10));
          break;
        case 'maior que':
          newSaveData = newSaveData
            .filter((item) => parseInt(item[filter.column], 10)
            > parseInt(filter.value, 10));
          break;
        case 'menor que':
          newSaveData = newSaveData
            .filter((item) => parseInt(item[filter.column], 10)
            < parseInt(filter.value, 10));
          break;
        default:
          break;
        }
        setNewData(newSaveData);
      });
    }
    // }
    // teste();
  }, [filters]);

  return (
    <MyContext.Provider
      value={ {
        vazio,
        setVazio,
        data,
        setFilters,
        filters,
        newData,
        setNewData,
        loading,
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
