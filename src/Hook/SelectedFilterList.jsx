import { useReducer } from "react";

function reducer(state, action) {
    console.log('FILTER REDUCER', action.type, action)
    switch (action.type) {
        case 'ADD_FILTER':
            return { selectedFilters: [...state.selectedFilters, action.payload] }
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
        }
    }
}