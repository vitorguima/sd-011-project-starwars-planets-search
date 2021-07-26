import React, { useEffect, useState } from 'react';

function Table () {
  const [apiResult, setApiResult] = useState([]);

  useEffect(() => {
    const request = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((data) => data.json());
      setApiResult(results);
    }

    request();
  }, [])

  const getHeader = () => {
    const request = apiResult[0];
    if(request){
      const get = Object.keys(request);
      return get.map((currentKey, index) => index <= 13 && currentKey !== 'residents' ? <th>{ currentKey }</th> : null)
    }
  }
  
  const tableRows = () => {
    if (apiResult) {
      const planets = apiResult.map((planet, index ) => Object.values({...apiResult[index]}));
      return planets.map((planet) => <tr>{ planet.map((infos, i) => <td key={ i }>{infos}</td>) }</tr>)
    }
  }

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
  )
};

export default Table;
