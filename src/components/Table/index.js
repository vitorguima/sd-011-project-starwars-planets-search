import React from 'react';
import Context from '../../utils/Context';
import snakeCaseToCapitalized from '../../utils/utils';

const planetInfoList = [
  'name', 'population', 'diameter', 'surface_water', 'climate', 'terrain', 'gravity',
  'orbital_period', 'rotation_period', 'url', 'films', 'created', 'edited',
];

const Table = () => {
  const { data, setData, filters } = React.useContext(Context);
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
            planetInfoList.map((info) => (
              <th key={ info }>
                {
                  snakeCaseToCapitalized(info)
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
                planetInfoList.map(
                  (info, index) => (
                    <td key={ index }>
                      {
                        info === 'films' ? planet[info][0] : planet[info]
                      }
                    </td>),
                )
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default Table;
