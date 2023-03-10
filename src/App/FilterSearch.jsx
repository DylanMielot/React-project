import React from 'react'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { Label, GroupLabel } from './FilterLabel';
import { getLabels } from '../App'
import { Dropdown } from 'bootstrap';

export default function FilterSearch({ selectedFilters,
    addSelectedFilter, deleteSelectedFilter,
    updateSelectedFilter, createGroupFilter,
    addFilterToGroup, removeFilterFromGroup,
    getGroupIdFromFilterId }) {

    return <div style={{ gridArea: 'navbar' }}>

        <SearchBar selectedFilters={selectedFilters} addSelectedFilter={addSelectedFilter} />

        {selectedFilters.length === 0 ? <span style={{ color: 'grey' }}>Aucun filtre sélectionné</span> :
            <QuickFilterDisplay
                addSelectedFilter={addSelectedFilter}
                selectedFilters={selectedFilters}
                deleteSelectedFilter={deleteSelectedFilter}
                updateSelectedFilter={updateSelectedFilter}
                createGroupFilter={createGroupFilter}
                addFilterToGroup={addFilterToGroup}
                removeFilterFromGroup={removeFilterFromGroup}
                getGroupIdFromFilterId={getGroupIdFromFilterId}
            />
        }

    </div>
}

function QuickFilterDisplay({ addSelectedFilter,
    selectedFilters, deleteSelectedFilter,
    updateSelectedFilter, createGroupFilter,
    addFilterToGroup, removeFilterFromGroup,
    getGroupIdFromFilterId }) {

    return <p style={{ display: 'flex' }}>Filtres :
        <span style={{ paddingLeft: '10px', display: 'inline-block', width: 'calc(100% - 60px)' }}>

            {selectedFilters.sort((x, y) => {
                if (x.type === 'group' && y.type !== 'group') return -1
                if (y.type === 'group' && x.type !== 'group') return 1
                if (x.type === 'group' && y.type === 'group') {
                    if (x.contrats.map(c => { return c.type }).includes('package')
                        && !y.contrats.map(c => { return c.type }).includes('package')) {
                        return -1
                    } else {
                        return 1
                    }
                }
                return 0
            }).map((filter, index) => {
                if (filter.type !== 'group') {
                    return <Label key={`${filter.id}`}
                        filter={filter}
                        onDelete={deleteSelectedFilter}
                        updateSelectedFilter={updateSelectedFilter}
                        createGroupFilter={createGroupFilter}
                        getGroupIdFromFilterId={getGroupIdFromFilterId}
                        removeFilterFromGroup={removeFilterFromGroup}
                    />
                } else {
                    return <GroupLabel
                        key={`${filter.id}`}
                        group={filter}
                        onDelete={deleteSelectedFilter}
                        onUpdate={updateSelectedFilter}
                        addSelectedFilter={addSelectedFilter}
                        addFilterToGroup={addFilterToGroup}
                        removeFilterFromGroup={removeFilterFromGroup}
                        getGroupIdFromFilterId={getGroupIdFromFilterId}
                    />
                }
            })
            }</span></p>
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