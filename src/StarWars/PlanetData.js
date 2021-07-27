import React from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './Context';
import FetchAPI from './FetchAPI';

const PlanetData = ({ children }) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    FetchAPI().then((result) => setData(result));
  }, []);

  return (
    <GlobalContext.Provider value={ data }>
      {children}
    </GlobalContext.Provider>
  );
};

PlanetData.propTypes = {
  children: PropTypes.func.isRequired,
};

export default PlanetData;
