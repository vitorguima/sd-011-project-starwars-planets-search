import React, { useEffect } from 'react';
import { useAuth } from '../providers/auth';

function Header() {
  const { user, setUser } = useAuth();

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((data) => setUser({
        data,
      }));
  }, [setUser]);

  return (
    <header>
      <h1>StarWars Planet Search</h1>
      <div>
        { user.data.count }
        {' '}
        planets found in database.
      </div>
    </header>
  );
}

export default Header;
