import React from 'react';
import Context from '../../utils/Context';

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
    const { filterByName } = filters;
    let filteredPlanets = data.results;

    if (filterByName) {
      filteredPlanets = filteredPlanets
        .filter(({ name }) => name.toLowerCase().includes(filterByName.name));
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
