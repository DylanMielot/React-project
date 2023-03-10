// import { useEffect, useReducer, useState } from "react"
// import { getLabels } from "../App";
// import { setError } from "../App/ErrorToast";

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_FILTER':
            action.payload.id = action.payload.id + '-' + action.uuid
            return { selectedFilters: [...state.selectedFilters, action.payload] }

        case 'DELETE_FILTER':
            return { selectedFilters: [...state.selectedFilters.filter(filter => filter.id !== action.payload)] }

        case 'UPDATE_FILTER':
            state.selectedFilters[action.index] = action.payload
            return { ...state }

        default:
            return state
    }
}

function LabelsReducer() {
    const [state, dispatch] = React.useReducer(reducer, {
        selectedFilters: []
    })

    React.useEffect(() => {
        console.log('STATE ', state.selectedFilters)
    }, [state])

    const [id, setId] = React.useState(0)
    function newId() {
        let newId = id.valueOf()
        setId(id + 1)
        return newId
    }

    return {
        selectedFilters: state.selectedFilters,
        addSelectedFilter: (filter) => {
            if (state.selectedFilters.filter(f => f.id === filter.id).length > 0) {
                setError('Erreur lors de l\'ajout du filtre : id déjà présent dans la liste')
                return 400
            }
            filter.isOnGroup = false
            dispatch({ type: 'ADD_FILTER', payload: filter, uuid: newId() })
            return 200
        },
        deleteSelectedFilter: (id) => {
            if (state.selectedFilters.filter(f => f.id === id).length > 1) {
                setError('Erreur lors de la suppression : plusieurs produits avec le même id trouvés')
                return 400
            }
            if (state.selectedFilters.filter(f => f.id === id).length < 1) {
                setError('Erreur lors de la suppression : produit non trouvé')
                return 400
            }
            dispatch({ type: 'DELETE_FILTER', payload: id })
            return 200
        },
        updateSelectedFilter: (filter) => {
            let line = state.selectedFilters.filter(f => f.id === filter.id)
            let index = state.selectedFilters.indexOf(line[0])
            if (index === -1) {
                setError('Erreur lors de la mise a jour du produit : produit non trouvé')
                return 400
            }
            dispatch({ type: 'UPDATE_FILTER', payload: filter, index: index })
            return 200
        },
        createGroupFilter: (filter1, filter2) => {
            if (['package', 'cav'].includes(filter1.type) && filter1.type === filter2.type) {
                setError(`Erreur lors de la création du groupe : un seul ${filter1.type} accepté`)
                return 400
            }
            let newGroup = getLabels('group')
            filter1.isOnGroup = true
            filter2.isOnGroup = true
            newGroup.contrats = [...newGroup.contrats, filter1, filter2]
            dispatch({ type: 'ADD_FILTER', payload: newGroup, uuid: newId() })
            dispatch({ type: 'DELETE_FILTER', payload: filter1.id })
            dispatch({ type: 'DELETE_FILTER', payload: filter2.id })
            return 200
        },
        addFilterToGroup: (groupId, filter) => {
            let group = state.selectedFilters.filter(f => f.id === groupId)[0]
            let index = state.selectedFilters.indexOf(group)
            if (group.type !== 'group') {
                setError('Erreur lors de l\'ajout du produit au groupe : groupe non trouvé')
                return 400
            }
            if (group.contrats.filter(contrat => contrat.id === filter.id).length > 0) {
                return 400
            }
            if (group.contrats.filter(contrat => contrat.type === filter.type).length > 0 &&
                ['package', 'cav'].includes(filter.type)) {
                setError(`Erreur lors de l\'ajout du produit au groupe : un seul ${filter.type} par groupe autorisé`)
                return 400
            }
            filter.isOnGroup = true
            group.contrats = [...group.contrats, filter]
            dispatch({ type: 'UPDATE_FILTER', payload: group, index: index })
            return 200
        },
        removeFilterFromGroup: (groupId, filterId) => {
            let group = state.selectedFilters.filter(f => f.id === groupId)[0]
            let index = state.selectedFilters.indexOf(group)
            if (group == undefined) {
                setError('Erreur lors de la suppression du groupe : groupe non trouvé')
                return 400
            }
            if (group.type !== 'group') {
                setError('Erreur lors de la suppression du groupe : l\'id ne correspond pas a un groupe')
                return 400
            }
            group.contrats = group.contrats.filter(f => f.id !== filterId)
            if (group.contrats.length < 2) {
                group.contrats[0].isOnGroup = false
                dispatch({ type: 'ADD_FILTER', payload: group.contrats[0], uuid: newId() })
                dispatch({ type: 'DELETE_FILTER', payload: group.id })
                return 200
            }
            if (group.contrats.map(contrat => {
                return contrat.type
            }).every(val => ['package', 'cav'].indexOf(val) === -1)) {
                group.contrats.forEach(contrat => {
                    contrat.isOnGroup = false
                    dispatch({ type: 'ADD_FILTER', payload: contrat, uuid: newId() })
                })
                dispatch({ type: 'DELETE_FILTER', payload: group.id })
                return 200
            }

            dispatch({ type: 'UPDATE_FILTER', payload: group, index: index })
            return 200
        },
        getGroupIdFromFilterId: (filterId) => {
            let groupId = state.selectedFilters.map(filter => {
                if (filter.type === 'group') {
                    let id = filter.contrats.map(contrat => {
                        if (contrat.id === filterId) return filter.id
                        return undefined
                    })
                    return id.filter(f => f !== undefined)[0]
                }
                return undefined
            })
            groupId = groupId.filter(f => f !== undefined)
            if (groupId.length > 1) {
                setError('Erreur lors de la recherche du groupe : plusieurs groupes avec le même id trouvé')
                return 400
            }
            if (groupId.length < 1) {
                setError('Erreur lors de la recherche du groupe : groupe non trouvé')
                return 400
            }
            return groupId[0]
        }
    }
}