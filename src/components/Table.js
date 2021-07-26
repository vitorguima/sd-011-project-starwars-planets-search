import React from 'react';
import MyContext from './MyContext';

const planetsData = [
  'name', 'population', 'diameter', 'surface_water', 'climate', 'terrain', 'gravity',
  'orbital_period', 'rotation_period', 'url', 'films', 'created', 'edited',
];
function Table() {
  const { data, setData } = React.useContext(MyContext);

  React.useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets');
      const apiData = await response.json();

      setData(apiData);
    };

    fetchPlanets();
  }, [setData]);

  return (
    <table>
      <thead>
        <tr>
          {
            planetsData.map((info) => (
              <th key={ info }>
                {
                  info
                    .split('_')
                    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
                    .join(' ')
                }
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          Object.keys(data).length > 0
        && data.results.map((planet) => (
          <tr key={ planet.name }>
            {
              planetsData.map(
                (info, index) => <td key={ index }>{ planet[info] }</td>,
              )
            }
          </tr>
        ))
        }
      </tbody>
    </table>
  );
}

export default Table;
