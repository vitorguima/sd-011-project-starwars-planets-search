import React, { useContext } from 'react';
import styled from 'styled-components';
import StarContext from '../contexts/starContext';

export default function Table() {
  const { data, filters } = useContext(StarContext);

  const filterName = filters.filterByName.name;
  const numberFilter = filters.filterByNumericValues;

  const newData = () => {
    let planets = [...data];
    numberFilter.forEach((options) => {
      if (options.comparison === 'maior que') {
        planets = planets
          .filter((planet) => Number(planet[options.column]) > Number(options.value));
      }
      if (options.comparison === 'menor que') {
        planets = planets
          .filter((planet) => Number(planet[options.column]) < Number(options.value));
      }
      if (options.comparison === 'igual a') {
        planets = planets
          .filter((planet) => Number(planet[options.column]) === Number(options.value));
      }
    });

    if (filterName) {
      planets = data.filter(({ name }) => (
        name.toLowerCase().includes(filterName)
      ));
    }

    return planets;
  };

  return (
    <StyledTable>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {
            newData().map((planet, index) => (
              <tr key={ index }>
                <td>{ planet.name }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>{ planet.films }</td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td>{ planet.url }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </StyledTable>
  );
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);

  th,
  td {
    padding: 10px;
    background-color: rgba(255,255,255,0.2);
    color: black;
  }

  th {
    text-align: left;
    color: white;
  }

  thead {
    th {
     background-color: #55608f;
    }
 
  }

  tbody {
    tr {
      &:hover {
        background-color: rgba(255,255,255,0.3);
      }
    }
    td {
      position: relative;
      &:hover {
        &:before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: -9999px;
          bottom: -9999px;
          background-color: rgba(255,255,255,0.2);
          z-index: -1;
        }
      }
    }
  }

`;
