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

  const [isLoading, setLoading] = React.useState(false)
  const [neverRun, setNeverRun] = React.useState(true)

  function handleLoading(value) {
    setLoading(value)
    neverRun && setNeverRun(false)
  }

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

      <ClientList isLoading={isLoading} neverRun={neverRun} />
      <SearchButton isLoading={isLoading} onClick={handleLoading} />
    </div>
  )
}
