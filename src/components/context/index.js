import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import getPlanets from '../../services/data';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [listAtt, setList] = useState([]);
  const [attNumber, setFilterNumber] = useState([]);
  const [attText, setFilterText] = useState([]);
  const contextValue = {
    planets,
    setPlanets,
    attText,
    setFilterText,
    attNumber,
    setFilterNumber,
    listAtt,
    setList,
  };

  useEffect(() => {
    const dataPlanets = async () => {
      const data = await getPlanets();
      setPlanets(data);
      setList(data);
    };
    dataPlanets();
  }, []);

  useEffect(() => {
    const searchName = () => {
      const filterText = planets
        .filter(({ name }) => name.toLowerCase().includes(attText) === true);
      setList(filterText);
    };
    searchName();
  }, [attText, attNumber, planets]);

  useEffect(() => {
    attNumber.map(({ column, comparison, value }) => {
      switch (comparison) {
      case 'maior que':
        return setList(
          [...planets.filter((planet) => Number(planet[column]) > Number(value))],
        );
      case 'menor que':
        return setList(
          [...planets.filter((planet) => Number(planet[column]) < Number(value))],
        );
      case 'igual a':
        return setList(
          [...planets.filter((planet) => Number(planet[column]) === Number(value))],
        );
      default:
        return planets;
      }
    });
  }, [attNumber]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
