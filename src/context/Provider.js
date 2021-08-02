import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchAPI from './FetchAPI';

export default function Provider({ children }) {
  const [data, setData] = React.useState(null);
  const resolvePromise = async () => {
    const response = await fetchAPI();
    setData(response);
  };

  React.useEffect(() => {
    resolvePromise();
  }, []);

  return (
    <Context.Provider value={ data }>{children}</Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
