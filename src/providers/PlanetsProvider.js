import { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../contexts/PlanetsContext';

function PlanetsProvider({ children }) {
    return (
        <PlanetsContext.Provider value={}>
            { children }
        </PlanetsContext.Provider>
    )
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PlanetsProvider;