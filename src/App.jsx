import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { ErrorToast } from './App/ErrorToast';
import FilterList from './App/FilterList';
import FilterSearch from './App/FilterSearch';
import LabelsReducer from './Hook/LabelsReducer';

export function getLabels(label = null) {
  const labels = [
    { label: 'Package 70000', id: 1, type: 'package', contrat: '70000', isOnGroup: false, isDroppable: true, canSelected: true, participants: [] },
    { label: 'Package 70010', id: 2, type: 'package', contrat: '70010', isOnGroup: false, isDroppable: true, canSelected: true, participants: [] },
    { label: 'Package 70300', id: 3, type: 'package', contrat: '70300', isOnGroup: false, isDroppable: true, canSelected: true, participants: [] },
    { label: 'Package 70310', id: 4, type: 'package', contrat: '70310', isOnGroup: false, isDroppable: true, canSelected: true, participants: [] },
    { label: 'CAV 40', id: 5, type: 'cav', contrat: '00400', isOnGroup: false, isDroppable: true, canSelected: true, participants: [] },
    { label: 'CAV 41', id: 6, type: 'cav', contrat: '00410', isOnGroup: false, isDroppable: true, canSelected: true, participants: [] },
    { label: 'CAV 42', id: 7, type: 'cav', contrat: '00420', isOnGroup: false, isDroppable: true, canSelected: true, participants: [] },
    { label: 'CAV 43', id: 8, type: 'cav', contrat: '00430', isOnGroup: false, isDroppable: true, canSelected: true, participants: [] },
    { label: 'CAV 44', id: 9, type: 'cav', contrat: '00440', isOnGroup: false, isDroppable: true, canSelected: true, participants: [] },
    { label: 'Carte 10138', id: 10, type: 'carte', contrat: '10138', isOnGroup: false, isDroppable: false, canSelected: true, participants: [] },
    { label: 'Carte 10170', id: 11, type: 'carte', contrat: '10170', isOnGroup: false, isDroppable: false, canSelected: true, participants: [] },
    { label: 'Group', id: 16, type: 'group', contrat: '', isOnGroup: false, isDroppable: false, canSelected: true, contrats: [], participants: [] }
  ]

  return label === null ? labels : labels.filter(lab => lab.label.toUpperCase() === label.toUpperCase())[0]
}


function App() {

  /**
   * TODO => Optimiser les performances avec des memo/callbacks
   * 
   * ==> utiliser context pour le LabelsReducer
   * ==> optimiser les appels a onUpdate depuis Group REDUCER
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
