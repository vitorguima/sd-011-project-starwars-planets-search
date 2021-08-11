import React from 'react';
import RenderHeader from './RenderHeader';
import RenderBody from './RenderBody';
import FormFiltersOrder from './FormFiltersOrder';
import UsedFilters from './UsedFilters';

export default function Table() {
  return (
    <div>
      <FormFiltersOrder />
      <UsedFilters />
      <table>
        <RenderHeader />
        <RenderBody />
      </table>
    </div>
  );
}
