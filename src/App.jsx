import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { ErrorToast } from './App/ErrorToast';
import FilterList from './App/FilterList';
import FilterSearch from './App/FilterSearch';
import LabelsReducer from './Hook/LabelsReducer';

function App() {

  /**
   * TODO => Optimiser les performances avec des memo/callbacks
  */

  const {
    selectedFilters,
    addSelectedFilter,
    deleteSelectedFilter,
    updateSelectedFilter
  } = LabelsReducer()

  return (
    <div className="skeleton">
      <FilterSearch selectedFilters={selectedFilters}
        addSelectedFilter={addSelectedFilter}
        deleteSelectedFilter={deleteSelectedFilter}
        updateSelectedFilter={updateSelectedFilter}
      />
      <FilterList />

      <ErrorToast />
    </div>
  );
}

export default App;
