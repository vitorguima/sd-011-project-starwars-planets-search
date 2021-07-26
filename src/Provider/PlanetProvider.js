import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import planetContext from '../Context/planetContext';
import planetAPI from '../services/planetsAPI';

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
  const [filter, setFilter] = useState([]);
  const [numberValue, setNumberValue] = useState(
    [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
  );

  useEffect(() => {
    planetAPI().then(({ results }) => setData(results));
  }, []);
  console.log(data, setData);

  const [clicked, setClicked] = useState(false);
  const [population, setPopulation] = useState(
    <option value="population">population</option>,
  );
  const [orbitalPeriod, setOrbitalPeriod] = useState(
    <option value="orbital_period">orbital_period</option>,
  );
  const [diameter, setDiameter] = useState(<option value="diameter">diameter</option>);
  const [rotationPeriod, setRotationPeriod] = useState(
    <option value="rotation_period">rotation_period</option>,
  );
  const [surfaceWater, setSurfaceWater] = useState(
    <option value="surface_water">surface_water</option>,
  );

  function hideOptionsFilter(value) {
    if (value === 'population') setPopulation('');
    if (value === 'orbital_period') setOrbitalPeriod('');
    if (value === 'diameter') setDiameter('');
    if (value === 'rotation_period') setRotationPeriod('');
    if (value === 'surface_water') setSurfaceWater('');
  }

  useEffect(() => {
    hideOptionsFilter(numberValue[0].column);
  }, [clicked, numberValue]);

  const handleChange = (value) => setName(value);

  const handleClick = (column, comparison, value) => {
    setNumberValue([{ column, comparison, value }]);
    setFilter([column]);
    setClicked(true);
  };

  return (
    <planetContext.Provider
      value={
        {
          data,
          filter,
          handleChange,
          population,
          orbitalPeriod,
          diameter,
          rotationPeriod,
          surfaceWater,
          clicked,
          numberValue,
          setNumberValue,
          handleClick,
          filters: { filterByName: { name } },
          filterByNumericValues: numberValue }
      }
    >
      {children}
    </planetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default PlanetProvider;
