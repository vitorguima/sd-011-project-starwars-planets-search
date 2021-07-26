import React from 'react';
import Context from '../../utils/Context';
import snakeCaseToCapitalized from '../../utils/utils';

const planetInfoList = [
  'name', 'population', 'diameter', 'surface_water', 'climate', 'terrain', 'gravity',
  'orbital_period', 'rotation_period', 'url', 'films', 'created', 'edited',
];
const numericOptions = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];
const caseTrue = -1;

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

  function filterPlanetsByName(filterByName, filteredPlanets) {
    filteredPlanets = filteredPlanets
      .filter(({ name }) => name.toLowerCase().includes(filterByName.name));

    return filteredPlanets;
  }

  function filterPlanetsByNumericValues(filterByNumericValues, filteredPlanets) {
    filterByNumericValues.forEach((filter) => {
      const { column, comparison, value } = filter;

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
    });

    return filteredPlanets;
  }

  function sortByNumericField(filteredPlanets, sort, column) {
    return filteredPlanets.sort((firstPlanet, secondPlanet) => (
      sort === 'ASC'
        ? Number(firstPlanet[column]) - Number(secondPlanet[column])
        : Number(secondPlanet[column]) - Number(firstPlanet[column])
    ));
  }

  function sortByStringField(filteredPlanets, sort, column) {
    return filteredPlanets.sort((firstPlanet, secondPlanet) => {
      if (sort === 'ASC') {
        return firstPlanet[column] < secondPlanet[column] ? caseTrue : 1;
      }
      return firstPlanet[column] > secondPlanet[column] ? caseTrue : 1;
    });
  }

  React.useEffect(() => {
    const { filterByName, filterByNumericValues, order } = filters;
    let filteredPlanets = data.results;

    if (Object.keys(filterByName).length > 0) {
      filteredPlanets = filterPlanetsByName(filterByName, filteredPlanets);
    }

    if (filterByNumericValues) {
      filteredPlanets = filterPlanetsByNumericValues(
        filterByNumericValues, filteredPlanets,
      );
    }

    const sortPlanets = (planetsList, column, sort) => {
      planetsList = numericOptions.includes(column)
        ? sortByNumericField(planetsList, sort, column)
        : sortByStringField(planetsList, sort, column);
      return planetsList;
    };

    if (filteredPlanets && order) {
      const { column, sort } = order;
      filteredPlanets = [...sortPlanets(filteredPlanets, column, sort)];
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
                    <td
                      key={ index }
                      data-testid={ info === 'name' ? 'planet-name' : null }
                    >
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
