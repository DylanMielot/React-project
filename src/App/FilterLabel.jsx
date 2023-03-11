function Label({ filter, onDelete,
    createGroupFilter, color = "primary",
    getGroupIdFromFilterId, removeFilterFromGroup,
    addFilterToGroup, updateSelectedFilter,
    addParticipantToFilter }) {

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

    return <span draggable={true}
        onDragStart={(e) => drag(e)}
        onDragOver={filter.isDroppable ? (e) => allowDrop(e) : (e) => null}
        onDrop={(e) => createGroup(e)}
        className={`badge text-bg-${color} ms-1`} >

        {filter.label}

        <LabelParticipant filter={filter}
            updateSelectedFilter={updateSelectedFilter} addParticipantToFilter={addParticipantToFilter}
            getGroupIdFromFilterId={getGroupIdFromFilterId} />

        <svg onClick={() => deleteFilter()} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-x-circle-fill ms-2" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
    </span>
}


function LabelParticipant({ filter, updateSelectedFilter }) {

    function getAuthorizedPart() {
        var authorizedPart = null
        if (filter.type === 'package') {
            authorizedPart = filter.isOnGroup ? [] : ['COT']
        } else {
            authorizedPart = filter.participants.filter(p => p === 'COT').length > 0 ? ['MAN', 'REP'] : ['COT', 'MAN', 'REP']
        }

        return authorizedPart
    }

    async function addParticipant(part) {
        setError('Fonctionalité non implémentée')
    }

    function deletePart(part) {
        filter.participants = filter.participants.filter(p => p !== part)
        updateSelectedFilter(filter)
    }

    let participants = getAuthorizedPart()
    if (participants.length > 0) {
        participants = <React.Fragment>
            <svg style={{ cursor: 'pointer' }} data-bs-toggle="dropdown" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-person-fill ms-2" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            </svg>
            <ul className="dropdown-menu">
                {participants.map((p, index) => {
                    return <li key={index}><a className="dropdown-item" href="#" onClick={() => addParticipant(p)}>{p}</a></li>
                })}
            </ul>
        </React.Fragment>
    } else participants = null

    return <React.Fragment>
        {filter.participants.length !== 0 && filter.participants.map((part, index) => {
            return <div key={index} className='participant ms-1' onClick={() => deletePart(part)}>{part}</div>
        })}
        {participants}
    </React.Fragment>
}
