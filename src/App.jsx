// import React from 'react'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import { ErrorToast } from './App/ErrorToast';
// import FilterList from './App/FilterList';
// import FilterSearch from './App/FilterSearch';
// import LabelsReducer from './Hook/LabelsReducer';


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
    updateSelectedFilter,
    createGroupFilter,
    addFilterToGroup,
    removeFilterFromGroup,
    getGroupIdFromFilterId
  } = LabelsReducer()

  return (
    <div className="skeleton">
      <FilterSearch selectedFilters={selectedFilters}
        addSelectedFilter={addSelectedFilter}
        deleteSelectedFilter={deleteSelectedFilter}
        updateSelectedFilter={updateSelectedFilter}
        createGroupFilter={createGroupFilter}
        addFilterToGroup={addFilterToGroup}
        removeFilterFromGroup={removeFilterFromGroup}
        getGroupIdFromFilterId={getGroupIdFromFilterId}
      />

      <ErrorToast />
    </div>
  )
}

  //     <FilterList />
