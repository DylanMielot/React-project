import { useReducer } from "react";

function reducer(state, action) {
    console.log('FILTER REDUCER', action.type, action)
    switch (action.type) {
        case 'ADD_FILTER':
            if (state.selectedFilters.filter(filter => filter.id == action.payload.id).length > 0) {
                console.error("Erreur lors de l'insertion du filter, présence de doublon.")
                return state
            }
            return { selectedFilters: [...state.selectedFilters, action.payload] }
        case 'DELETE_FILTER':
            return { selectedFilters: [...state.selectedFilters.filter(filter => filter.id != action.payload)] }
        case 'UPDATE_FILTER':
            let line = state.selectedFilters.filter(filter => filter.id == action.payload.id)
            let index = state.selectedFilters.indexOf(line[0])
            if (index == -1) {
                console.warn("item not found, state not changed")
                return state
            }
            state.selectedFilters[index] = action.payload
            return { ...state }
        default:
            return state
    }
}

export default function SelectedFilterList() {
    const [state, dispatch] = useReducer(reducer, {
        selectedFilters: []
    })

    return {
        selectedFilters: state.selectedFilters,
        addSelectedFilter: (filter) => {
            dispatch({ type: 'ADD_FILTER', payload: filter })
        },
        deleteSelectedFilter: (id) => {
            dispatch({ type: 'DELETE_FILTER', payload: id })
        },
        updateSelectedFilter: (filter) => {
            dispatch({ type: 'UPDATE_FILTER', payload: filter })
        }
    }
}