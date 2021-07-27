import React from 'react';
import PropTypes from 'prop-types';
import useFetch from '../Hooks/useFetch';

export const Context = React.createContext();

const GlobalContext = ({ children }) => {
    const {data, loading, error, request } = useFetch();
    return (
        <Context.Provider value={{ data, loading, error, request }}>
            {children}
        </Context.Provider>
    );
};


GlobalContext.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
};

export default GlobalContext;
