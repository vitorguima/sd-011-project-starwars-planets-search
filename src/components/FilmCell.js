import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function FilmCell({ film }) {
  const [filmData, setFilmData] = useState({ title: '' });

  useEffect(() => {
    fetch(film)
      .then((response) => response.json())
      .then((data) => setFilmData(data));
  });

  const { title } = filmData;

  return (
    <a href={ film } target="_blank" rel="noreferrer">
      { title }
    </a>
  );
}

FilmCell.propTypes = {
  film: PropTypes.string.isRequired,
};

export default FilmCell;
