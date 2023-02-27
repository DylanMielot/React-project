import React, { useEffect } from 'react'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import Label from './FilterLabel';

export default function FilterSearch({ selectedFilters, addSelectedFilter, deleteSelectedFilter, updateSelectedFilter }) {

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
                <Label key={filter.label}
                    filter={filter}
                    onDelete={deleteSelectedFilter}
                    updateSelectedFilter={updateSelectedFilter}
                />
            )
            }</p>}

    </div>
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
                if (e === null || e._reactName === "onBlur") {
                    setacValue('')
                } else {
                    setacValue(value)
                }
            }}
        />
    );
}