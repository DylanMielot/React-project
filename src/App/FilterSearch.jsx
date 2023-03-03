import React from 'react'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { Label, GroupLabel } from './FilterLabel';
import { getLabels } from '../App'

export default function FilterSearch({ selectedFilters, addSelectedFilter, deleteSelectedFilter, updateSelectedFilter }) {

    return <div style={{ gridArea: 'navbar' }}>

        <SearchBar selectedFilters={selectedFilters} addSelectedFilter={addSelectedFilter} />

        {selectedFilters.length === 0 ? <span style={{ color: 'grey' }}>Aucun filtre sélectionné</span> :
            <QuickFilterDisplay
                addSelectedFilter={addSelectedFilter}
                selectedFilters={selectedFilters}
                deleteSelectedFilter={deleteSelectedFilter}
                updateSelectedFilter={updateSelectedFilter}
            />
        }

    </div>
}

function QuickFilterDisplay({ addSelectedFilter, selectedFilters, deleteSelectedFilter, updateSelectedFilter }) {

    return <p>Filtres :
        {selectedFilters.sort((x, y) => {
            if (x.type === 'group' && y.type !== 'group') return -1
            return 0
        }).map((filter, index) => {
            if (filter.type !== 'group') {
                return <Label key={`${filter.id}-${index}`}
                    filter={filter}
                    addSelectedFilter={addSelectedFilter}
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


function SearchBar({ addSelectedFilter }) {
    const [acValue, setacValue] = useState('')
    const labels = getLabels()

    function handleClick(e, value) {
        value && addSelectedFilter(value)
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
                labels.filter(label => label.canSelected)
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