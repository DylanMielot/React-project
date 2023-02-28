import React, { useEffect, useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ErrorToast from './App/ErrorToast';
import FilterList from './App/FilterList';
import FilterSearch from './App/FilterSearch';
import SelectedFilterList from './Hook/SelectedFilterList';

function App() {

  /**
   * TODO => Optimiser les performances avec des memo/callbacks
   *      => IMPORTANT : Dans la classe FilterLabel,
   *        je modifie l'id du filtre, mais le filtre est deja sélectionné a ce moment la 
   *      => il faut modifier l'id du filtre dans le REDUCER de SelectedFilterLabel
   *        en ce basant sur l'id produit et l'index dans le tableau
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
