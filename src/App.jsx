import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import FilterList from './App/FilterList';
import FilterSearch from './App/FilterSearch';
import SelectedFilterList from './Hook/SelectedFilterList';



function App() {
  const {
    selectedFilters,
    addSelectedFilter,
    deleteSelectedFilter
  } = SelectedFilterList()

  return (
    <div className="skeleton">
      <FilterSearch selectedFilters={selectedFilters}
        addSelectedFilter={addSelectedFilter}
        deleteSelectedFilter={deleteSelectedFilter}
      />
      <FilterList />
    </div>
  );
}

export default App;
