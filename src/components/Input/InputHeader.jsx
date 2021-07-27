import React from 'react';
import PlanetSearchBar from './PlanetSearchBar';
import Selector from './Selector';

export default function InputHeader() {
  return (
    <div className="row">
      <PlanetSearchBar />
      <Selector />
    </div>
  );
}
