function App() {

  /**
   * TODO => Optimiser les performances avec des memo/callbacks
   * 
   * ==> utiliser context pour le LabelsReducer
   * ==> Anomalie en cours : Créer un groupe avec cav et carte
   *    ==> passer la carte sur un CAV ALC
   *    ==> plusieurs groupes trouvé dans le getAuthorizedPart
   *    ==> hypothèse : lorsque je créé un nouveau groupe, durant un instant la carte se retrouve dans
   *        deux groupes, a ce moment la le composant de la carte est rechargé, et le getGroupFromFilterId
   *        remonte les deux groupes. Donc retour 400
   *    ==> solution : il faut que je supprime la carte dans le premier groupe avant de créer le 
   *        second groupe
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
