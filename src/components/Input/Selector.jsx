import React from 'react';
import ComparisonFilter from './ComparisonFilter';
import OrderFilter from './OrderFilter';

export default function Selector() {
  return (
    <div className="row ">
      <ComparisonFilter />
      <OrderFilter />
    </div>
  );
}
