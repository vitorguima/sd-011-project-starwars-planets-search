import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import AppContext from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filters, setFilters] = useState({ filterByName: { name: '' } });
  const [filterSelect, setFilterSelect] = useState('population');
  const [filterComparation, setFilterComparation] = useState('maior que');
  const [filterInput, setFilterInput] = useState('maior que');
  const [filterObject, setFilterObject] = useState([]);
  const [listaColunas, setListaColunas] = useState([]);

  useEffect(() => {
    const getStar = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((dataApi) => dataApi.json());
      setData(results);
      setFilterData(results);
    };
    getStar();
  }, []);

  function handleChange({ target }) {
    setFilters(target.value.toLowerCase());
    const newData = data.filter(
      (planet) => planet.name.toLowerCase().includes(target.value),
    );
    setFilterData(newData);
  }

  function handleClickSelect({ target }) {
    setFilterSelect(target.value);
  }

  function handleClickComparison({ target }) {
    setFilterComparation(target.value);
  }

  function handleClickInput({ target }) {
    setFilterInput(target.value);
  }

  function filterPlanets() {
    const filter = [...filterObject];
    let filteredData = filterData;

    filter.push({
      column: filterSelect,
      comparison: filterComparation,
      value: filterInput,
    });

    const colunasAdicionadas = [...listaColunas];
    colunasAdicionadas.push(filterSelect);
    setListaColunas(colunasAdicionadas);

    setFilterObject(filter);

    filter.forEach((atual) => {
      const { column, comparison, value } = atual;

      if (comparison === 'menor que') {
        filteredData = filteredData.filter(
          (planet) => parseInt(planet[column], 10) < parseInt(value, 10),
        );
      }
      if (comparison === 'igual a') {
        filteredData = filteredData.filter(
          (planet) => parseInt(planet[column], 10) === parseInt(value, 10),
        );
      }
      if (comparison === 'maior que') {
        filteredData = filteredData.filter(
          (planet) => parseInt(planet[column], 10) > parseInt(value, 10),
        );
      }
    });

    setFilterData(filteredData);
  }

  return (
    <div>
      <AppContext.Provider
        value={ {
          filterData,
          setFilterData,
          handleChange,
          filters,
          handleClickSelect,
          filterPlanets,
          handleClickComparison,
          handleClickInput,
          filterSelect,
          setFilterSelect,
          filterComparation,
          setFilterComparation,
          filterInput,
          setFilterInput,
          filterObject,
          listaColunas,
        } }
      >
        {children}
      </AppContext.Provider>
    </div>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
