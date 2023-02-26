import React, { useEffect } from 'react'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';


export default function FilterSearch({ selectedFilters, addSelectedFilter, deleteSelectedFilter }) {

    const labels = [
        { label: 'Package 70000', id: 1 },
        { label: 'Package 70010', id: 2 },
        { label: 'Package 70300', id: 3 },
        { label: 'Package 70310', id: 4 },
        { label: 'CAV 40', id: 5 },
        { label: 'CAV 41', id: 6 },
        { label: 'CAV 42', id: 7 },
        { label: 'CAV 43', id: 8 },
        { label: 'CAV 44', id: 9 },
        { label: 'Cotitulaire', id: 10 },
        { label: 'Mandataire', id: 11 },
        { label: 'Représentant', id: 12 },
        { label: 'Carte 10138', id: 13 },
        { label: 'Carte 10170', id: 14 }
    ]

    return <div style={{ gridArea: 'navbar' }}>

        <SearchBar labels={labels} selectedFilters={selectedFilters} addSelectedFilter={addSelectedFilter} />

        <p>Selected filters : {(selectedFilters).map(filter =>
            <Label key={filter} filter={filter} onDelete={deleteSelectedFilter} />)
        }</p>

    </div>
}

function Label({ filter, onDelete }) {

    function deleteFilter(filter) {
        onDelete(filter)
    }

    return <span className='badge text-bg-primary ms-1'>{filter}
        <svg onClick={() => deleteFilter(filter)} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="ms-2 bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
        </svg>
    </span>
}


function SearchBar({ labels, selectedFilters, addSelectedFilter }) {

    const [acValue, setacValue] = useState('')

    function handleClick(e) {
        addSelectedFilter(e.target.innerHTML)
        setacValue('')
    }

    return (
        <Autocomplete
            inputValue={acValue}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            className='mt-3 mb-3'
            disablePortal
            id="search"
            options={labels.filter(label => !selectedFilters.includes(label.label))}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Rechercher un filtre" />}
            onChange={(e) => handleClick(e)}
            onInputChange={(e) => { e === null ? setacValue('') : setacValue(e.target.value) }}
        />
    );
}