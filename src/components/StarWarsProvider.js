import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanetsApi from '../services/StarWarsPlanetApi';

function StarWarsProvider(props) {
  const [data, setData] = useState([]);
  const [planetName, setPlanetName] = useState('');
  const [column, setColum] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [filterToApply, setFilterToApply] = useState(false);
  const [FilteredResults, setFilteredResults] = useState([]);

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
