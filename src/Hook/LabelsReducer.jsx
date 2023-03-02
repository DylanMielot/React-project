import { useEffect, useReducer, useState } from "react";

function reducer(state, action) {
    console.log('FILTER REDUCER', action.type, action)
    switch (action.type) {
        case 'ADD_FILTER':
            action.payload.id = action.payload.id + '-' + action.uuid
            if (state.selectedFilters.filter(filter => filter.id == action.payload.id).length > 0) {
                action.onError('FILTER REDUCER - ' + action.type + ' : Erreur lors de l\'ajout, présence de doublons')
                return state
            }
            return { selectedFilters: [...state.selectedFilters, action.payload] }

        case 'DELETE_FILTER':
            if (state.selectedFilters.filter(filter => filter.id == action.payload).length > 1) {
                action.onError('FILTER REDUCER - ' + action.type + ' : Erreur lors de la suppression, présence de doublons')
                return state
            }
            return { selectedFilters: [...state.selectedFilters.filter(filter => filter.id != action.payload)] }

        case 'UPDATE_FILTER':
            let line = state.selectedFilters.filter(filter => filter.id == action.payload.id)
            let index = state.selectedFilters.indexOf(line[0])
            if (index == -1) {
                action.onError('FILTER REDUCER - ' + action.type + " : Item non trouvé")
                return state
            }
            state.selectedFilters[index] = action.payload
            return { ...state }
        default:
            return state
    }
}

export default function LabelsReducer(setError) {
    const [state, dispatch] = useReducer(reducer, {
        selectedFilters: []
    })

    // useEffect(() => {
    //     console.warn(state.selectedFilters)
    // }, [state])

    function onError(message) {
        setError({ message: message })
    }

    const [id, setId] = useState(0)
    function newId() {
        let newId = id.valueOf()
        setId(id + 1)
        return newId
    }

    return {
        selectedFilters: state.selectedFilters,
        addSelectedFilter: (filter) => {
            dispatch({ type: 'ADD_FILTER', payload: filter, onError: onError, uuid: newId() })
        },
        deleteSelectedFilter: function (id) {
            dispatch({ type: 'DELETE_FILTER', payload: id, onError: onError })
        },
        updateSelectedFilter: (filter) => {
            dispatch({ type: 'UPDATE_FILTER', payload: filter, onError: onError })
        }
    }
}