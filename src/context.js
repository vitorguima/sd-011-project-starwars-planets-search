import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchApi from './services';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const setApiToState = async () => {
      try {
        const data = await fetchApi();
        setPlanets(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    setApiToState();
  }, []);

  return (
    <AppContext.Provider
      value={ {
        planets,
      } }
    >
      { children }
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => (useContext(AppContext));

export { AppContext, AppProvider };

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
