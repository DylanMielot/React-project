import React from 'react'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { Label, GroupLabel } from './FilterLabel';

export default function FilterSearch({ selectedFilters, addSelectedFilter, deleteSelectedFilter, updateSelectedFilter }) {

    const labels = [
        { label: 'Package 70000', id: 1, type: 'package', contrat: '70000', canSelected: true, participants: [] },
        { label: 'Package 70010', id: 2, type: 'package', contrat: '70010', canSelected: true, participants: [] },
        { label: 'Package 70300', id: 3, type: 'package', contrat: '70300', canSelected: true, participants: [] },
        { label: 'Package 70310', id: 4, type: 'package', contrat: '70310', canSelected: true, participants: [] },
        { label: 'CAV 40', id: 5, type: 'cav', contrat: '00400', canSelected: true, participants: [] },
        { label: 'CAV 41', id: 6, type: 'cav', contrat: '00410', canSelected: true, participants: [] },
        { label: 'CAV 42', id: 7, type: 'cav', contrat: '00420', canSelected: true, participants: [] },
        { label: 'CAV 43', id: 8, type: 'cav', contrat: '00430', canSelected: true, participants: [] },
        { label: 'CAV 44', id: 9, type: 'cav', contrat: '00440', canSelected: true, participants: [] },
        { label: 'Carte 10138', id: 10, type: 'carte', contrat: '10138', canSelected: true, participants: [] },
        { label: 'Carte 10170', id: 11, type: 'carte', contrat: '10170', canSelected: true, participants: [] },
        { label: 'Titulaire', id: 12, type: 'participation', contrat: '', canSelected: true, participants: [] },
        { label: 'Cotitulaire', id: 13, type: 'participation', contrat: '', canSelected: true, participants: [] },
        { label: 'Mandataire', id: 14, type: 'participation', contrat: '', canSelected: true, participants: [] },
        { label: 'Représentant', id: 15, type: 'participation', contrat: '', canSelected: true, participants: [] },
        { label: 'Group', id: 16, type: 'group', contrat: '', canSelected: true, contrats: [], participants: [] }
    ]

    return <div style={{ gridArea: 'navbar' }}>

        <SearchBar labels={labels} selectedFilters={selectedFilters} addSelectedFilter={addSelectedFilter} />

        {selectedFilters.length == 0 ? <span style={{ color: 'grey' }}>Aucun filtre sélectionné</span> :
            <QuickFilterDisplay
                selectedFilters={selectedFilters}
                deleteSelectedFilter={deleteSelectedFilter}
                updateSelectedFilter={updateSelectedFilter}
            />
        }

    </div>
}

function QuickFilterDisplay({ selectedFilters, deleteSelectedFilter, updateSelectedFilter }) {

    return <p>Filtres :
        {(selectedFilters).map((filter, index) => {
            if (filter.type != 'group') {
                return <Label key={`${filter.id}-${index}`}
                    filter={filter}
                    onDelete={deleteSelectedFilter}
                    updateSelectedFilter={updateSelectedFilter}
                />
            } else {
                return <GroupLabel
                    key={`${filter.id}-${index}`}
                    group={filter}
                    onDelete={deleteSelectedFilter}
                    onUpdate={updateSelectedFilter}
                />
            }
        })
        }</p>
}


function SearchBar({ labels, selectedFilters, addSelectedFilter }) {

    const [acValue, setacValue] = useState('')

    function handleClick(e, value) {
        if (value) {
            addSelectedFilter(value)
        }
        setacValue('')
    }

    // Peut être utiliser la propriete id a la place de label pour options, a voir si anomalies
    return (
        <Autocomplete
            inputValue={acValue}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            className='mt-3 mb-3'
            disablePortal
            id="search"
            options={
                labels.filter(label => (label.canSelected && !(label.label.indexOf('CAV') != -1 && selectedFilters.map(filter => filter.label).includes(label.label))))
            }
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