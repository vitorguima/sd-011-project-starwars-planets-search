import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import Api from '../helpers/Api';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ filterByName: { name: '' } });
  const [arrayFiltrado, setArrayFiltrado] = useState([]);

  useEffect(() => {
    async function requisitionApi() {
      setLoading(true);
      const ApiSave = await Api();
      setData(ApiSave);
      setLoading(false);
    }
    requisitionApi();
  }, []);

  useEffect(() => {
    function filterPlanets() {
      const saveData = data.filter(({ name }) => (
        name.toLowerCase().includes(filters.filterByName.name)));
      console.log(saveData);
      setArrayFiltrado(saveData);
    }
    filterPlanets();
  }, [filters, data]);

  return (
    <MyContext.Provider value={ { data, loading, filters, setFilters, arrayFiltrado } }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
