function GroupLabel({ group, onDelete,
    addFilterToGroup, removeFilterFromGroup,
    getGroupIdFromFilterId, addSelectedFilter,
    updateSelectedFilter }) {

    function unPack() {
        group.contrats.forEach(contrat => {
            if (group.contrats.indexOf(contrat) !== group.contrat.length) {
                let status = addSelectedFilter(contrat)
                status === 200 && removeFilter(contrat.id)
            }
        })
    }

    function allowDrop(e) {
        e.preventDefault()
    }

    /**
     * Allows you to add a new contract to the group with a drag & drop
     * @param {Event} e 
     */
    async function drop(e) {
        e.preventDefault();
        var data = JSON.parse(e.dataTransfer.getData("text/plain"))
        if (data.isOnGroup) {
            let groupId = await getGroupIdFromFilterId(data.id)
            if (groupId !== 400) {
                let status = await addFilterToGroup(group.id, JSON.parse(JSON.stringify(data)))
                status === 200 && removeFilterFromGroup(groupId, data.id)
            }
        } else {
            let status = await addFilterToGroup(group.id, JSON.parse(JSON.stringify(data)))
            status === 200 && onDelete(data.id)
        }
    }

    function className() {
        let className = 'packageGroup'
        !group.contrats.map(contrat => {
            return contrat.type
        }).includes('package') && (className = 'cavGroup')
        return className
    }

    function updateFilter() {
        updateSelectedFilter(group)
    }

    function removeFilter(contractId) {
        removeFilterFromGroup(group.id, contractId)
    }

    function addParticipantToGroup(filter, part) {
        let pkg = group.contrats.filter(f => f.type === 'package')
        let cav = group.contrats.filter(f => f.type === 'cav')
        if (part === 'COT') {
            pkg.forEach(p => {
                !p.participants.includes('COT') && (p.participants = [...p.participants, part])
            })
            cav.forEach(p => {
                !p.participants.includes('COT') && (p.participants = [...p.participants, part])
            })
            !filter.participants.includes('COT') && (filter.participants = [...filter.participants, part])
        } else {
            filter.participants = [...filter.participants, part]
            filter.type !== 'cav' && (cav.forEach(c => {
                !c.participants.includes(part) && (c.participants = [...c.participants, part])
            }))
        }
        updateFilter()
    }

    function removeParticipantFromGroup(filter, index) {
        let part = filter.participants[index]
        if (['cav', 'package'].includes(filter.type)) {
            group.contrats.forEach(c => {
                c.participants = c.participants.filter(p => p !== part)
            })
        } else {
            filter.participants = filter.participants.filter((p, i) => i !== index)
        }
        updateFilter()
    }


    return <span
        onDrop={(e) => drop(e)}
        onDragOver={(e) => allowDrop(e)}
        className={className()}
        style={{ position: "relative" }}>

        <svg onClick={() => onDelete(group.id)} style={{ position: 'absolute', right: "3px", top: "1px", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="red" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>

        <svg onClick={() => unPack()} xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', right: "3px", bottom: "1px", cursor: "pointer" }} width="13" height="13" fill="green" className="bi bi-box-fill" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001 6.971 2.789Zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z" />
        </svg>

        {group.contrats.length > 0 ? group.contrats.sort((x, y) => {
            if (x.type === 'package') return -1
            if (x.type === 'cav' && y.type !== 'package') return - 1
            return 0

        }).map((filter) => {
            return <Label key={`${group.id}-${filter.id}`}
                filter={filter}
                onDelete={removeFilter}
                color={filter.type === "package" ? "warning" : "primary"}
                getGroupIdFromFilterId={getGroupIdFromFilterId}
                updateSelectedFilter={updateFilter}
                addParticipantToGroup={addParticipantToGroup}
                removeParticipantFromGroup={removeParticipantFromGroup}
            />
        }) : <span style={{ color: 'grey' }} className="ms-1"> vide </span>}
    </span>
}
