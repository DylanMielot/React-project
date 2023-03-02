import React, { useEffect, useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ErrorToast from './App/ErrorToast';
import FilterList from './App/FilterList';
import FilterSearch from './App/FilterSearch';
import LabelsReducer from './Hook/LabelsReducer';

function App() {

  /**
   * TODO => Optimiser les performances avec des memo/callbacks
   * 
   * NEXT STEP => Mettre en place la gestion des erreurs dans GROUP REDUCER et GROUP LABEL
  */

  const [error, setError] = useState({ message: '' })

  const {
    selectedFilters,
    addSelectedFilter,
    deleteSelectedFilter,
    updateSelectedFilter
  } = LabelsReducer(setError)

  // ErrorToast a revoir => Trouver un moyen de générer une erreur plus facilement
  // => Une classe avec un timeout et un unMount ?
  // => Ou se renseigner sur le useContext pour y passer le setError
  // => A RAJOUTER DANS GROUP REDUCER

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
