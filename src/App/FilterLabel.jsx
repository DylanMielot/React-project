function Label({ filter, onDelete,
    createGroupFilter, color = "primary",
    getGroupIdFromFilterId, removeFilterFromGroup,
    addFilterToGroup, updateSelectedFilter }) {

    const authorizedPart = filter.type === 'package' ? ['COT'] : ['COT', 'REP', 'MAN']

    function deleteFilter() {
        onDelete(filter.id)
    }

    function drag(e) {
        e.dataTransfer.setData("text/plain", JSON.stringify(filter))
    }

    function allowDrop(e) {
        e.preventDefault()
    }

    async function createGroup(e) {
        e.preventDefault();
        var data = JSON.parse(e.dataTransfer.getData("text/plain"))
        if (data.isOnGroup && !filter.isOnGroup) {
            let groupId = await getGroupIdFromFilterId(data.id)
            let status = await createGroupFilter(filter, data)
            status === 200 && removeFilterFromGroup(groupId, data.id)
            return
        }
        if (data.isOnGroup || filter.isOnGroup || filter.type === data.type) {
            return
        }
        createGroupFilter(filter, data)
    }

    function addParticipant(part) {
        if (part === 'COT' && filter.participants.filter(p => p === part).length > 0) {
            setError('Erreur lors de l\'ajout du participant : un seul COT autorisé')
            return
        }
        if (filter.type === 'package' && filter.isOnGroup) {
            setError('Attention, les participants des packages et des cav ne sont pas synchronisés')
        }
        filter.participants = [...filter.participants, part]
        updateSelectedFilter(filter)
    }

    function deletePart(part) {
        filter.participants = filter.participants.filter(p => p !== part)
        updateSelectedFilter(filter)
    }

    //updateSelectedFilter to implement on second svg to add new participants
    return <span draggable={true}
        onDragStart={(e) => drag(e)}
        onDragOver={filter.isDroppable ? (e) => allowDrop(e) : (e) => null}
        onDrop={(e) => createGroup(e)}
        className={`badge text-bg-${color} ms-1`} >

        {filter.label}
        {filter.participants.length !== 0 && filter.participants.map((part, index) => {
            return <div key={index} className='participant ms-1' onClick={() => deletePart(part)}>{part}</div>
        })}

        <svg style={{ cursor: 'pointer' }} data-bs-toggle="dropdown" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-person-fill ms-2" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        </svg>
        <ul className="dropdown-menu">
            {authorizedPart.map(p => {
                return <li><a className="dropdown-item" href="#" onClick={() => addParticipant(p)}>{p}</a></li>
            })}
        </ul>

        <svg onClick={() => deleteFilter()} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-x-circle-fill ms-2" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
    </span>
}

function GroupLabel({ group, onDelete,
    addFilterToGroup, removeFilterFromGroup,
    getGroupIdFromFilterId, addSelectedFilter,
    updateSelectedFilter }) {

    /**
     * Allows selectedFilter reducer to delete the group
     *  if it is composed of only one contract
     * @param {Number} contractId 
     */
    function removeFilter(contractId) {
        removeFilterFromGroup(group.id, contractId)
    }

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
                addFilterToGroup={addFilterToGroup}
                removeFilterFromGroup={removeFilterFromGroup}
                getGroupIdFromFilterId={getGroupIdFromFilterId}
                updateSelectedFilter={updateFilter}
            />
        }) : <span style={{ color: 'grey' }} className="ms-1"> vide </span>}
    </span>
}
