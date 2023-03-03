import { useEffect, useReducer, useState } from "react";
import { setError } from "../App/ErrorToast";

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
            if (state.selectedFilters.filter(f => f.id === filter.id).length > 0) {
                setError('FILTER REDUCER @ADD_FILTER Presence of duplicates')
                return 400
            }
            dispatch({ type: 'ADD_FILTER', payload: filter, uuid: newId() })
            return 200
        },
        deleteSelectedFilter: (id) => {
            if (state.selectedFilters.filter(f => f.id === id).length > 1) {
                setError('FILTER REDUCER @DELETE_FILTER Unable de delete item : many items with same id found')
                return 400
            } if (state.selectedFilters.filter(f => f.id === id).length < 1) {
                setError('FILTER REDUCER @DELETE_FILTER Unable de delete item : item not found')
                return 400
            }
            dispatch({ type: 'DELETE_FILTER', payload: id })
            return 200
        },
        updateSelectedFilter: (filter) => {
            let line = state.selectedFilters.filter(f => f.id === filter.id)
            let index = state.selectedFilters.indexOf(line[0])
            if (index === -1) {
                setError('FILTER REDUCER @UPDATE_FILTER Item not found')
                return 400
            }
            dispatch({ type: 'UPDATE_FILTER', payload: filter, index: index })
            return 200
        }
    }
}