import React from 'react';
import PropTypes from 'prop-types';
import FilmLi from './FilmLi';

// RETURNS AN UL WITH FILM TITLES INSIDE. EACH CHILD WILL RECEIVE AN URL TO FETCH
function FilmsUl({ urls }) {
  return (
    <ul>
      {urls.map((url, i) => i < 2 && (<FilmLi key={ i } url={ url } />))}
    </ul>
  );
}

FilmsUl.propTypes = {
  urls: PropTypes.array,
}.isRequired;

export default FilmsUl;
