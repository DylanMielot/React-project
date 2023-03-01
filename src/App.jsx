import React, { useEffect, useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ErrorToast from './App/ErrorToast';
import FilterList from './App/FilterList';
import FilterSearch from './App/FilterSearch';
import SelectedFilterList from './Hook/SelectedFilterList';

function App() {

  /**
   * TODO => Optimiser les performances avec des memo/callbacks
  */

  const [error, setError] = useState({ message: '' })

  const {
    selectedFilters,
    addSelectedFilter,
    deleteSelectedFilter,
    updateSelectedFilter
  } = SelectedFilterList(setError)

  // ErrorToast a revoir => Trouver un moyen de générer une erreur plus facilement
  // => Une classe avec un timeout et un unMount ?
  // => Ou se renseigner sur le useContext pour y passer le setError

  return (
    <div className="skeleton">
      <FilterSearch selectedFilters={selectedFilters}
        addSelectedFilter={addSelectedFilter}
        deleteSelectedFilter={deleteSelectedFilter}
        updateSelectedFilter={updateSelectedFilter}
      />
      <FilterList />

      <ErrorToast error={error} />
    </div>
  );
}

export default App;
