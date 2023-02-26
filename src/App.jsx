import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import FilterList from './App/FilterList';
import FilterSearch from './App/FilterSearch';
import SelectedFilterList from './Hook/SelectedFilterList';



function App() {
  const {
    selectedFilters,
    addSelectedFilter
  } = SelectedFilterList()

  return (
    <div className="skeleton">
      <FilterSearch selectedFilters={selectedFilters} addSelectedFilter={addSelectedFilter} />
      <FilterList />
    </div>
  );
}

export default App;
