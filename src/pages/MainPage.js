import React from 'react';
import PlanetsTable from '../components/PlanetsTable';
import FormFilters from '../components/FormFilters';
import FormSort from '../components/FormSort';

function MainPage() {
  return (
    <main>
      <FormFilters />
      <FormSort />
      <PlanetsTable />
    </main>
  );
}

export default MainPage;
