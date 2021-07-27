import React, { useEffect, useState } from 'react';

function Table() {
  const [apiResultCopy, setApiResultCopy] = useState([]);
  const [apiResult, setApiResult] = useState([]);
  const num = 13;

  useEffect(() => {
    const request = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((data) => data.json());
      setApiResult(results);
      setApiResultCopy(results);
    };

    request();
  }, []);

  // const renderPlanetFiltered = () => {
  //   console.log(filtOption);
  //   return
  // };

  const filterPlanets = (filText) => {
    if (filText.length > 0) {
      const filteredPlanets = apiResult.filter((planet) => (
        (planet.name).includes(filText)));
      console.log(filteredPlanets);
      setApiResult(filteredPlanets);
    } else {
      setApiResult(apiResultCopy);
    }
  };

  const getHeader = () => {
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
      <input
        id="input-filter"
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => filterPlanets(target.value) }
      />
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
    </div>
  );
}

export default Table;
