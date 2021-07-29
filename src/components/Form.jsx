import React from 'react';
import SearchInput from './SearchInput';
import Filter from './Filter';

function Form() {
  return (
    <form className="form">
      <SearchInput />
      <Filter />
    </form>
  );
}

export default Form;
