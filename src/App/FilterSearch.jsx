import React, { useEffect } from 'react'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';


export default function FilterSearch({ selectedFilters, addSelectedFilter, deleteSelectedFilter }) {

    const labels = [
        { label: 'Package 70000', type: 'package', contrat: '70000', participants: [] },
        { label: 'Package 70010', type: 'package', contrat: '70010', participants: [] },
        { label: 'Package 70300', type: 'package', contrat: '70300', participants: [] },
        { label: 'Package 70310', type: 'package', contrat: '70310', participants: [] },
        { label: 'CAV 40', type: 'cav', contrat: '00400', participants: [] },
        { label: 'CAV 41', type: 'cav', contrat: '00410', participants: [] },
        { label: 'CAV 42', type: 'cav', contrat: '00420', participants: [] },
        { label: 'CAV 43', type: 'cav', contrat: '00430', participants: [] },
        { label: 'CAV 44', type: 'cav', contrat: '00440', participants: [] },
        { label: 'Carte 10138', type: 'carte', contrat: '10138', participants: [] },
        { label: 'Carte 10170', type: 'carte', contrat: '10170', participants: [] },
        { label: 'Titulaire', type: 'participation', contrat: '', participants: [] },
        { label: 'Cotitulaire', type: 'participation', contrat: '', participants: [] },
        { label: 'Mandataire', type: 'participation', contrat: '', participants: [] },
        { label: 'Représentant', type: 'participation', contrat: '', participants: [] }
    ]

    return <div style={{ gridArea: 'navbar' }}>

        <SearchBar labels={labels} selectedFilters={selectedFilters} addSelectedFilter={addSelectedFilter} />

        {selectedFilters.length == 0 ? <span style={{ color: 'grey' }}>Aucun filtre sélectionné</span> :
            <p>Filtres : {(selectedFilters).map(filter =>
                <Label key={filter.label} filter={filter} onDelete={deleteSelectedFilter}
                />
            )
            }</p>}

    </div>
}

function Label({ filter, onDelete }) {

    function deleteFilter(filter) {
        onDelete(filter)
    }

    return <span className='badge text-bg-primary ms-1'>{filter.label}
        {filter.participants.length != 0 ? filter.participants.map(part => {
            return <span style={{ color: 'cyan' }} key={part} className='ms-2'>{part}</span>
        }) : null}

        <svg onClick={() => deleteFilter(filter)} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="ms-2 bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
        </svg>
    </span>
}


function SearchBar({ labels, selectedFilters, addSelectedFilter }) {

    const [acValue, setacValue] = useState('')

    function handleClick(e, value) {
        if (value) {
            addSelectedFilter(value)
        }
        setacValue('')
    }

    return (
        <Autocomplete
            inputValue={acValue}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            className='mt-3 mb-3'
            disablePortal
            id="search"
            options={labels.filter(label => !selectedFilters.map(filter => filter.label).includes(label.label))}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Rechercher un filtre rapide" />}
            onChange={(e, value) => handleClick(e, value)}
            onInputChange={(e, value) => {
                e === null ? setacValue('') : setacValue(value)
            }}
        />
    );
}