import React, { useEffect, useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ErrorToast from './App/ErrorToast';
import FilterList from './App/FilterList';
import FilterSearch from './App/FilterSearch';
import SelectedFilterList from './Hook/SelectedFilterList';

function App() {

  /**
   * TODO => Optimiser les performances avec des memo/callbacks
   *      => Créer une class error pour gérer les erreurs lors des manipulations des filtres
   *      => Trouver une solution pour les clés uniques FilterLabel
   */

  const [error, setError] = useState({ message: '' })

  const {
    selectedFilters,
    addSelectedFilter,
    deleteSelectedFilter,
    updateSelectedFilter
  } = SelectedFilterList(setError)

  // ErrorToast a revoir => fonctionne pas bien

  return (
    <div className="skeleton">
      <FilterSearch selectedFilters={selectedFilters}
        addSelectedFilter={addSelectedFilter}
        deleteSelectedFilter={deleteSelectedFilter}
        updateSelectedFilter={updateSelectedFilter}
      />
      <FilterList />

      <button style={{ gridArea: "a" }} onClick={() => { setError({ message: 'ERREUR 1' }) }}>click1</button>
      <button style={{ gridArea: "c" }} onClick={() => { setError({ message: 'ERREUR 2' }) }}>click2</button>


      <ErrorToast error={error} />
    </div>
  );
}

export default App;
