import React, { useState, useEffect } from 'react';
import fetchApi from '../services/fetchApi';
import StarWarsContent from './StarWarsContent';

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
      <StarWarsContent.Provider
        value={ {
          dataTable,
        } }
      >
        { children }
      </StarWarsContent.Provider>
    );
  }
  
  export default StarWarsProvider;
