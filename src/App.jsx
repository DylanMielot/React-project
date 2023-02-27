import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import FilterList from './App/FilterList';
import FilterSearch from './App/FilterSearch';
import SelectedFilterList from './Hook/SelectedFilterList';

function App() {

  /**
   * TODO => Optimiser les performances avec des memo/callbacks
   */

  function TEST_ajout_filtre() {
    updateSelectedFilter({ label: 'Package 70310', type: 'package', contrat: '70310', participants: ['TIT'] })
  }

  const {
    selectedFilters,
    addSelectedFilter,
    deleteSelectedFilter,
    updateSelectedFilter
  } = SelectedFilterList()

  return (
    <div className="skeleton">
      <FilterSearch selectedFilters={selectedFilters}
        addSelectedFilter={addSelectedFilter}
        deleteSelectedFilter={deleteSelectedFilter}
        updateSelectedFilter={updateSelectedFilter}
      />
      <FilterList />

      <button style={{ gridArea: 'c' }} onClick={() => TEST_ajout_filtre()}></button>
    </div>
  );
}

export default App;
