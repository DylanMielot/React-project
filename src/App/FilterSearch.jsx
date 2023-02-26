import React, { useEffect } from 'react'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';


export default function FilterSearch({ selectedFilters, addSelectedFilter }) {

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
            <Label filter={filter} />)
        }</p>

    </div>
}

function Label({ filter }) {
    return <span key={filter} className='badge text-bg-primary ms-1'>{filter}</span>
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