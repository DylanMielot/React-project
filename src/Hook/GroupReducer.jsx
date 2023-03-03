import { useReducer, useState } from "react"
import { setError } from "../App/ErrorToast"

function reducer(state, action) {
    console.log('GROUP REDUCER', action.type, action)
    switch (action.type) {

        case 'ADD_FILTER':
            if (state.group.filter(filter => filter.id === action.payload.id).length > 0) {
                setError('GROUP REDUCER @' + action.type + ' Item already in group')
                return state
            }
            action.payload.id = action.payload.id + '-' + action.uuid
            return { group: [...state.group, action.payload] }

        case 'DELETE_FILTER':
            return { group: state.group.filter(contrat => contrat.id !== action.payload) }
        default:
            return state
    }
}

export default function GroupReducer(initialState) {
    const [state, dispatch] = useReducer(reducer, {
        group: initialState
    })

    const [id, setId] = useState(0)
    function newId() {
        let newId = id.valueOf()
        setId(id + 1)
        return newId
    }

    return {
        groupContract: state.group,
        addContract: function (filter) {
            if (state.group.filter(contrat => contrat.type === filter.type).length > 0 &&
                ['package', 'cav'].includes(filter.type)) {
                setError(`GROUP REDUCER @ADD_FILTER A ${filter.type} is already on group`)
                return 400
            }
            dispatch({ type: 'ADD_FILTER', payload: filter, uuid: newId() })
            return 200
        },
        deleteContract: function (filterId) {
            dispatch({ type: 'DELETE_FILTER', payload: filterId })
            return 200
        }
    }
}