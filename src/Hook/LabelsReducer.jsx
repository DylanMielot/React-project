import { useEffect, useReducer, useState } from "react";
import { setError } from "../App/ErrorToast";

function reducer(state, action) {
    console.log('FILTER REDUCER', action.type, action)
    switch (action.type) {
        case 'ADD_FILTER':
            action.payload.id = action.payload.id + '-' + action.uuid
            if (state.selectedFilters.filter(filter => filter.id === action.payload.id).length > 0) {
                setError('FILTER REDUCER @' + action.type + ' Item already in selected filters')
                return state
            }
            return { selectedFilters: [...state.selectedFilters, action.payload] }

        case 'DELETE_FILTER':
            if (state.selectedFilters.filter(filter => filter.id === action.payload).length > 1) {
                setError('FILTER REDUCER @' + action.type + ' Unable de delete item : many items with same id found')
                return state
            }
            return { selectedFilters: [...state.selectedFilters.filter(filter => filter.id !== action.payload)] }

        case 'UPDATE_FILTER':
            let line = state.selectedFilters.filter(filter => filter.id === action.payload.id)
            let index = state.selectedFilters.indexOf(line[0])
            if (index === -1) {
                setError('FILTER REDUCER @' + action.type + "Item not found")
                return state
            }
            state.selectedFilters[index] = action.payload
            return { ...state }
        default:
            return state
    }
}

export default function LabelsReducer() {
    const [state, dispatch] = useReducer(reducer, {
        selectedFilters: []
    })

    useEffect(() => {
        console.log('STATE ', state.selectedFilters)
    }, [state])

    const [id, setId] = useState(0)
    function newId() {
        let newId = id.valueOf()
        setId(id + 1)
        return newId
    }

    return {
        selectedFilters: state.selectedFilters,
        addSelectedFilter: (filter) => {
            dispatch({ type: 'ADD_FILTER', payload: filter, uuid: newId() })
            return 200
        },
        deleteSelectedFilter: function (id) {
            dispatch({ type: 'DELETE_FILTER', payload: id })
            return 200
        },
        updateSelectedFilter: (filter) => {
            dispatch({ type: 'UPDATE_FILTER', payload: filter })
            return 200
        }
    }
}