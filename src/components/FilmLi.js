import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// RETURN A FILM TITLE INSIDE A LI AFTER FETCH
function FilmLi({ url }) {
  const [filmData, setFilmData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH URL WHEN COMPONENT MOUNT
  useEffect(() => {
    const fetchFilm = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setFilmData(json.title);
      setIsLoading(false);
    };
    fetchFilm();
  }, [url]);
  if (!isLoading) {
    return (
      <li>{filmData}</li>
    );
  }
  return (
    <p>Loading</p>
  );
}

FilmLi.propTypes = {
  url: PropTypes.string,
}.isRequired;

export default FilmLi;
