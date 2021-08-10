import React from 'react';
import RenderHeader from './RenderHeader';
import RenderBody from './RenderBody';
import FormFiltersOrder from './FormFiltersOrder';

export default function Table() {
  return (
    <div>
      <FormFiltersOrder />
      <table>
        <RenderHeader />
        <RenderBody />
      </table>
    </div>
  );
}
