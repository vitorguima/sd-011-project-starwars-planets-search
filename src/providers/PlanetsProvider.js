import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PlanetsContext } from '../contexts/PlanetsContext.js';
import { getStarWarsPlanets } from '../services/starwarAPI.js';

function PlanetsProvider({ children }) {

    // const [data, setData] = useState([]); // Passando [se pegasse a chave "results", q é array
    const [data, setData] = useState({}); // O teste espera o retorno inteiro, ou seja um objeto. Por isso {}
    const [error, setError] = useState('tem nada de error');
    const [isFetching, setisFetching]= useState(true);


    useEffect(() => {
      console.log('data do provider após query à API:')
      console.log(data);
      console.log('error do provider após query à API:')
      console.log(error);
    }, [data, error]);


    // const fetchPlanetsCallSuccess = (apiData) => {
    //   setisFetching(false);
    //   setData(apiData);
    //   // getStarWarsPlanets().then(fetchPlanetsSucess, fetchPlanetsError);
    // }

    // function fetchPlanetsCallError(error) {
    //   setisFetching(false);
    //   setError(error);
    // }

    // function fetchPlanetsSucess(jsonSucess) {
    //   setisFetching(false);
    //   setData(jsonSucess);
    // }

    // function fetchPlanetsError(Error) {
    //   setisFetching(false);
    //   setError(Error.message);
    // }


    const context = {
      // fetchPlanetsCallSuccess: fetchPlanetsCallSuccess,
      // fetchPlanetsCallError: fetchPlanetsCallError,
      data,
      setData: setData,
      setError: setError,
      error,
      isFetching,
    }

    return (
        // <PlanetsContext.Provider value={context}>
        //     { children }
        // </PlanetsContext.Provider>
        null
    )
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PlanetsProvider;