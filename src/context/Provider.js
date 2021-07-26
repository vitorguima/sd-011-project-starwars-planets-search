import React from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';
import fetchAPI from './fetchAPI';

export default function Provider({ children }) {
  const [data, setData] = React.useState(null);

  async function resolvePromise() {
    const response = await fetchAPI();
    setData(response);
  }

  React.useEffect(() => {
    resolvePromise();
  }, []);

  return (
    <GlobalContext.Provider value={ { data } }>{children}</GlobalContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
