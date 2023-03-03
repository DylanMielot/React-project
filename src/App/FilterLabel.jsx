import React, { useEffect } from 'react'
import { getLabels } from '../App'
import GroupReducer from '../Hook/GroupReducer'

export function Label({ filter, addSelectedFilter, onDelete, updateSelectedFilter, color = "primary" }) {

    function deleteFilter() {
        onDelete(filter.id)
    }

    function drag(e) {
        e.dataTransfer.setData("text/plain", JSON.stringify(filter))
    }

    function allowDrop(e) {
        e.preventDefault()
    }

    async function createGroup(e) {
        e.preventDefault();
        var data = JSON.parse(e.dataTransfer.getData("text/plain"))
        if (filter.isOnGroup || data.type === filter.type) {
            return
        }
        let newGroup = getLabels('group')
        newGroup.contrats = [...newGroup.contrats, filter, data]
        let status = await addSelectedFilter(newGroup)
        if (status === 200) {
            onDelete(filter.id)
            onDelete(data.id)
        }
    }

    //updateSelectedFilter to implement on second svg to add new participants
    return <span draggable={true}
        onDragStart={(e) => drag(e)}
        onDragOver={filter.isDroppable ? (e) => allowDrop(e) : (e) => null}
        onDrop={(e) => createGroup(e)}
        className={`badge text-bg-${color} ms-1`} >

        {filter.label}
        {filter.participants.length !== 0 && filter.participants.map((part, index) => {
            return <span style={{ color: 'cyan' }} key={index} className='ms-2'>{part}</span>
        })}

        <svg style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-person-fill ms-2" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        </svg>

        <svg onClick={() => deleteFilter()} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-x-circle-fill ms-2" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
    </span>
}

export function GroupLabel({ group, onDelete, onUpdate }) {

    const {
        groupContract,
        addContract,
        deleteContract
    } = GroupReducer(group.contrats)

    useEffect(() => {
        group.contrats = groupContract
        onUpdate(group)
    }, [groupContract])


    // Quand les tests sur les groupes seront finis
    // Il faudrat vérifier < 2
    // Si true => sortir le contrat du groupe et supprimer le groupe
    async function deleteSelectedFilter(contractId) {
        await deleteContract(contractId)
        group.contrats < 1 && onDelete(group.id)
    }

    function updateSelectedFilter() {
        console.log('update filter in group')
    }

    function allowDrop(e) {
        e.preventDefault()
    }

    async function drop(e) {
        e.preventDefault();
        var data = JSON.parse(e.dataTransfer.getData("text/plain"))
        let status = await addContract(JSON.parse(JSON.stringify(data)))
        status === 200 && onDelete(data.id)
    }

    return <span
        onDrop={(e) => drop(e)}
        onDragOver={(e) => allowDrop(e)}
        className='contractGroup ms-1'
        style={{ position: "relative" }}>

        <svg onClick={() => onDelete(group.id)} style={{ position: 'absolute', right: "-8px", top: "-8px", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>

        {group.contrats.length > 0 ? group.contrats.sort((x, y) => {
            if (x.type === 'package') return -1
            if (x.type === 'cav' && y.type !== 'package') return - 1
            return 0

        }).map((filter, index) => {
            filter.isOnGroup = true
            return <Label key={`${group.id}-${filter.id}-${index}`}
                filter={filter}
                onDelete={deleteSelectedFilter}
                updateSelectedFilter={updateSelectedFilter}
                color={filter.type === "package" ? "warning" : "primary"}
            />
        }) : <span style={{ color: 'grey' }} className="ms-1"> vide </span>}
    </span>
}
