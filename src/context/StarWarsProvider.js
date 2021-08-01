import React, { useState, useEffect } from 'react';
import fetchApi from '../services/fetchApi';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
    const [data, setData] = useState([]);
    const [dataTable, setDataTable] = useState([]);
  
    useEffect(() => {
      fetchApi()
        .then((result) => setData(result));
    }, []);
  
    useEffect(() => {
      setDataTable(data);
    }, [data]);

    return (
      <StarWarsContext.Provider
        value={ {
          dataTable,
        } }
      >
        { children }
      </StarWarsContext.Provider>
    );
  }
  
  export default StarWarsProvider;
