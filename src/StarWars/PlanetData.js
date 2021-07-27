import React from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './Context';
import FetchAPI from './FetchAPI';

const PlanetData = ({ children }) => {
  const [data, setData] = React.useState([]);
  const [planetData, setPlanetData] = React.useState([]);

  React.useEffect(() => {
    FetchAPI().then((result) => setData(result));
  }, []);

  React.useEffect(() => {
    setPlanetData(data);
  }, [data]);

  return (
    <GlobalContext.Provider valor={ planetData }>
      {children}
    </GlobalContext.Provider>
  );
};

PlanetData.propTypes = {
  children: PropTypes.objectOf.isRequired,
};

export default PlanetData;
