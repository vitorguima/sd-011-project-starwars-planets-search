import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Mycontext';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState({
    filterByName: {
      name: '',
    },
  });

  useEffect(() => {
    const getApi = async () => {
      const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endPoint)
        .then((res) => res.json());
      results.filter((item) => item !== 'residents');
      setData(results);
    };
    getApi();
  }, []);

  const handleChange = ({ target }) => {
    setSearchValue({
      ...searchValue,
      filterByName: { name: target.value },
    });
  };

  return (
    <MyContext.Provider value={ { data, searchValue, handleChange } }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
