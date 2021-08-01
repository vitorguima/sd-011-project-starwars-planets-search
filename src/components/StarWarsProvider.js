import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanetsApi from '../services/StarWarsPlanetApi';
import Options from './ComparisonOptions';

function StarWarsProvider(props) {
  const [data, setData] = useState([]);
  const [planetName, setPlanetName] = useState('');
  const [controledOption, setControledOption] = useState(0);
  const [column, setColum] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [filterToApply, setFilterToApply] = useState(false);
  const [FilteredResults, setFilteredResults] = useState([]);
  const [FilteredOptions, setFilteredOptions] = useState([]);
  const [addOptionColum, setAddOptionColum] = useState([]);
  const [addedFiltersArray, setAddedFiltersArray] = useState([]);

  let newPosition = null;

  function resetOptionsAtSelect() {
    if (FilteredOptions.length <= 0) {
      setFilteredOptions(Options);
    }
  }

  function removeFilter(index) {
    const harryPotter = 5;
    if (addedFiltersArray.length === harryPotter) {
      setAddedFiltersArray([]);
    }
    setAddedFiltersArray(
      addedFiltersArray.filter((item, index3) => (
        index3 !== index
      )),
      FilteredOptions.push(addedFiltersArray[index].column),
    );
    if (addedFiltersArray.length <= 1) {
      setFilteredOptions(Options);
      const getSelectElement = document.querySelector('#setColum');
      getSelectElement.value = 'population';
      setColum('population');
      console.log('entrei aqui');
      resetOptionsAtSelect();
      return setFilteredResults(data);
    }
    if (addedFiltersArray > 1) {
      setFilteredResults(addedFiltersArray[index - 1].filterResults);
    }
  }

  function removeFilterOptionFromSelect() {
    return setFilteredOptions(
      FilteredOptions.filter((item) => (
        item !== column
      )),
    );
  }

  function addFilterAtClickRender(filteredByFilters) {
    const filterFormat = {
      column,
      value,
      filterResults: filteredByFilters,
    };

    setAddedFiltersArray([...addedFiltersArray, filterFormat]);
    removeFilterOptionFromSelect();
  }

  function filterBtnOnClickHandler() {
    const getSelectElement = document.querySelector('#setColum');
    if (FilteredOptions.length - 1 > 0) {
      newPosition = FilteredOptions[0 + 1];
    } if (FilteredOptions.length <= 1) {
      newPosition = FilteredOptions[1 * 0];
    }
    getSelectElement.value = FilteredOptions[1 * 0];
    setColum(newPosition);
    setFilterToApply(true);

    if (comparison === 'maior que') {
      const filteredByFilters = data
        .filter((item) => Number(item[column]) > Number(value));
      setFilteredResults(filteredByFilters);
      addFilterAtClickRender(filteredByFilters);
    } if (comparison === 'menor que') {
      const filteredByFilters = data
        .filter((item) => Number(item[column]) < Number(value));
      setFilteredResults(filteredByFilters);
      addFilterAtClickRender(filteredByFilters);
    } if (comparison === 'igual a') {
      const filteredByFilters = data
        .filter((item) => Number(item[column]) === Number(value));
      setFilteredResults(filteredByFilters);
      addFilterAtClickRender(filteredByFilters);
    }
  }

  const infos = {
    data,
    setData,
    planetName,
    setPlanetName,
    column,
    setColum,
    comparison,
    setComparison,
    value,
    setValue,
    filterToApply,
    setFilterToApply,
    FilteredResults,
    setFilteredResults,
    controledOption,
    setControledOption,
    FilteredOptions,
    setFilteredOptions,
    addOptionColum,
    setAddOptionColum,
    filterBtnOnClickHandler,
    removeFilter: (index) => removeFilter(index),
    setAddedFiltersArray,
    addedFiltersArray,
  };

  useEffect(() => {
    const getData = async () => {
      const Data = await fetchPlanetsApi();
      return setData(Data);
    };
    getData();
  }, [planetName]);

  const { children } = props;
  return (
    <StarWarsContext.Provider value={ { infos } }>
      { children }
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: PropTypes.shape(Object),
};

StarWarsProvider.defaultProps = {
  children: PropTypes.shape(Object),
};
