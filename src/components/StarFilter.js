import React, { useContext } from 'react';
import styled from 'styled-components';
import StarContext from '../contexts/starContext';

export default function StarFilter() {
  const { setFilter } = useContext(StarContext);
  return (
    <HeaderStyle>
      <form>
        <input
          type="text"
          name="nameFilter"
          data-testid="name-filter"
          placeholder="search"
          onChange={ ({ target }) => setFilter(target.value) }
        />
      </form>
      <h1>StarWars Planets</h1>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  background-color: #55608f;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;

  form {
    display: flex;
    flex-wrap: wrap;

    & > input {
      border: none;
      flex: 1 1 10ch;
      margin: auto.5rem;

      &[type="text"] {
        flex: 3 1 30ch;
      }
    }
  }

`;
