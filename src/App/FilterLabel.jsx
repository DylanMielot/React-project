import React, { useEffect } from 'react'
import GroupReducer from '../Hook/GroupReducer'

export function Label({ filter, onDelete, updateSelectedFilter, color = "primary" }) {

    function deleteFilter() {
        onDelete(filter.id)
    }

    function drag(e) {
        e.dataTransfer.setData("text/plain", JSON.stringify(filter))
    }

    //updateSelectedFilter to implement on second svg to add new participants
    return <span draggable="true"
        onDragStart={(e) => drag(e)}
        className={`badge text-bg-${color} ms-1`} >

        {filter.label}
        {filter.participants.length != 0 ? filter.participants.map((part, index) => {
            return <span style={{ color: 'cyan' }} key={index} className='ms-2'>{part}</span>
        }) : null}

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
        await addContract(JSON.parse(JSON.stringify(data)))
        onDelete(data.id)
    }

    return <span
        onDrop={(e) => drop(e)}
        onDragOver={(e) => allowDrop(e)}
        className='contractGroup ms-1'>

        {group.contrats.length > 0 ? group.contrats.map((filter, index) => {
            return <Label key={`${group.id}-${filter.id}-${index}`}
                filter={filter}
                onDelete={deleteSelectedFilter}
                updateSelectedFilter={updateSelectedFilter}
                color={filter.type == "package" ? "warning" : "primary"}
            />
        }) : <span style={{ color: 'grey' }} className="ms-1"> vide </span>}
    </span>
}
