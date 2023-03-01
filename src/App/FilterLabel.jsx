import React, { useEffect } from 'react'
import GroupReducer from '../Hook/GroupReducer'

export function Label({ filter, onDelete, updateSelectedFilter }) {

    function deleteFilter() {
        onDelete(filter.id)
    }

    //updateSelectedFilter to implement on second svg to add new participants
    return <span className='badge text-bg-primary ms-1'>{filter.label}
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
    } = GroupReducer()

    // C'est plus propre mais ça n'a rien changé. Si je créé deux groupes,
    // que j'ajoute un package dans chaque groupe et que je supprime
    //le package dans le premier groupe, tous les contrats du second groupe sont aussi supprimé
    useEffect(() => {
        group.contrats = groupContract
        onUpdate(group)

        // Trouver un moyen de faire la suppression du contrat dans ce useEffect
        // Actuellement le groupe est supprimé dés la création
        if (groupContract.length < 1) {
            onDelete(group.id)
        }
    }, [groupContract])


    function deleteSelectedFilter(contractId) {
        deleteContract(contractId)
    }

    function updateSelectedFilter() {
        console.log('update filter group')
    }

    function TEST_addContract() {
        let contrat = { label: 'Package 70010', id: 2, type: 'package', contrat: '70010', canSelected: true, participants: [] }
        addContract(contrat)
    }

    return <span className='contractGroup ms-1'>
        {groupContract.map((filter, index) => {
            return <Label key={`${group.id}-${filter.id}-${index}`}
                filter={filter}
                onDelete={deleteSelectedFilter}
                updateSelectedFilter={updateSelectedFilter}
            />
        })}
        <button onClick={() => TEST_addContract()}>add</button>
    </span>
}
/*
*/