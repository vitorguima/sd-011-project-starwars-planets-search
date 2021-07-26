import React from 'react';
import MyContext from './MyContext';

const planetsData = [
  'name', 'population', 'diameter', 'surface_water', 'climate', 'terrain', 'gravity',
  'orbital_period', 'rotation_period', 'url', 'films', 'created', 'edited',
];
function Table() {
  const { data, setData, filters } = React.useContext(MyContext);
  const [planets, setPlanets] = React.useState([]);

  React.useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets');
      const apiData = await response.json();

      setData(apiData);
    };

    fetchPlanets();
  }, [setData]);

  React.useEffect(() => {
    const { filterByName, filterByNumericValues } = filters;
    let filteredPlanets = data.results;

    if (filterByName) {
      filteredPlanets = filteredPlanets
        .filter(({ name }) => name.toLowerCase().includes(filterByName.name));
    }
    if (filterByNumericValues) {
      const { column, comparison, value } = filterByNumericValues;
      filteredPlanets = filteredPlanets
        .filter((planet) => {
          switch (comparison) {
          case 'maior que':
            return Number(planet[column]) > Number(value);
          case 'menor que':
            return Number(planet[column]) < Number(value);
          case 'igual a':
            return Number(planet[column]) === Number(value);
          default:
            return true;
          }
        });
    }

    setPlanets(filteredPlanets);
  }, [data, filters]);

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
          planets && planets.map((planet) => (
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
