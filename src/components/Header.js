import React, { useEffect } from 'react';
import { useAuth } from '../providers/auth';

function Header() {
  const { planets, setPlanets } = useAuth();

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((data) => setPlanets({
        data,
      }));
  }, [setPlanets]);

  return (
    <header>
      <h1>StarWars Planet Search</h1>
      <div>
        { planets.data.count }
        {' '}
        planets found in database.
      </div>
    </header>
  );
}

export default Header;
