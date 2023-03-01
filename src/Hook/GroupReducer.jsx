import React, { useEffect, useReducer, useState } from "react"

function reducer(state, action) {
    console.log('GROUP REDUCER', action.type, action)
    switch (action.type) {

        case 'ADD_FILTER':
            action.payload.id = action.payload.id + '-' + action.uuid
            if (state.group.filter(filter => filter.id == action.payload.id).length > 0) {
                console.warn('DOUBLON : id => ', action.payload.id)
            }
            return { group: [...state.group, action.payload] }

        case 'DELETE_FILTER':
            return { group: state.group.filter(contrat => contrat.id !== action.payload) }
    }
}

export default function GroupReducer() {
    const [state, dispatch] = useReducer(reducer, {
        group: []
    })

    const [id, setId] = useState(0)
    function newId() {
        let newId = id.valueOf()
        setId(id + 1)
        return newId
    }

    return {
        groupContract: state.group,
        addContract: function (filters) {
            dispatch({ type: 'ADD_FILTER', payload: filters, uuid: newId() })
        },
        deleteContract: function (filterId) {
            dispatch({ type: 'DELETE_FILTER', payload: filterId })
        }
    }
}