import { useReducer } from "react";

function reducer(state, action) {
    console.log('FILTER REDUCER', action.type, action)
    switch (action.type) {
        case 'ADD_FILTER':
            return { selectedFilters: [...state.selectedFilters, action.payload] }
        case 'DELETE_FILTER':
            return { selectedFilters: [...state.selectedFilters.filter(filter => filter != action.payload)] }
        case 'UPDATE_FILTER':
            let line = state.selectedFilters.filter(filter => filter.label == action.payload.label)
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
        deleteSelectedFilter: (filter) => {
            dispatch({ type: 'DELETE_FILTER', payload: filter })
        },
        updateSelectedFilter: (filter) => {
            dispatch({ type: 'UPDATE_FILTER', payload: filter })
        }
    }
}