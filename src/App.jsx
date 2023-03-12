function App() {

  /**
   * TODO => Optimiser les performances avec des memo/callbacks
   * 
   * ==> utiliser context pour le LabelsReducer
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
