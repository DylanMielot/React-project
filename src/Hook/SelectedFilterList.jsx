import { useReducer } from "react";

function reducer(state, action) {
    console.log('FILTER REDUCER', action.type, action)
    switch (action.type) {
        case 'ADD_FILTER':
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
            console.warn(state.selectedFilters.map(filter => filter.id))
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

export default function SelectedFilterList(setError) {
    const [state, dispatch] = useReducer(reducer, {
        selectedFilters: []
    })

    function onError(message) {
        setError({ message: message })
    }

    return {
        selectedFilters: state.selectedFilters,
        addSelectedFilter: (filter) => {
            dispatch({ type: 'ADD_FILTER', payload: filter, onError: onError })
        },
        deleteSelectedFilter: (id) => {
            dispatch({ type: 'DELETE_FILTER', payload: id, onError: onError })
        },
        updateSelectedFilter: (filter) => {
            dispatch({ type: 'UPDATE_FILTER', payload: filter, onError: onError })
        }
    }
}