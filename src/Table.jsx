import React, { useEffect, useState } from 'react';

function Table() {
  const [apiResult, setApiResult] = useState([]);
  const num = 13;

  useEffect(() => {
    const request = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((data) => data.json());
      setApiResult(results);
    };

    request();
  }, []);

  // const filterPlanets = () => {
  //   console.log(apiResult);
  //   for (let indexPlanet in apiResult){
  //     const { { name } } = apiResult[indexPlanet];
  //   }
  // };

  const getHeader = () => {
    // filterPlanets();
    const request = apiResult[0];
    if (request) {
      const get = Object.keys(request);
      return (get.map((currentKey, index) => (
        index <= num && currentKey !== 'residents' ? (
          <th>
            { currentKey }
          </th>
        ) : null
      )));
    }
  };

  const tableRows = () => {
    if (apiResult) {
      const planets = apiResult.map((_, index) => (
        Object.values({ ...apiResult[index] })
      ));
      return planets.map((planet, n) => (
        <tr key={ n }>{ planet.map((infos, i) => <td key={ i }>{ infos }</td>) }</tr>
      ));
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {getHeader()}
          </tr>
        </thead>
        <tbody>
          {tableRows()}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
