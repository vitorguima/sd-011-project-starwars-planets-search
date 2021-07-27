import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import Api from '../helpers/Api';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function requisitionApi() {
      setLoading(true);
      const ApiSave = await Api();
      setData(ApiSave);
      setLoading(false);
    }
    requisitionApi();
  }, []);

  return (
    <MyContext.Provider value={ { data, loading } }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
