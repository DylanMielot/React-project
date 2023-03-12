function Label({ filter, onDelete,
    createGroupFilter, color = "primary",
    getGroupIdFromFilterId, removeFilterFromGroup,
    updateSelectedFilter, addParticipantToGroup,
    removeParticipantFromGroup }) {

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
            let group = await getGroupIdFromFilterId(data.id)
            let status = await createGroupFilter(filter, data)
            status === 200 && removeFilterFromGroup(group.id, data.id)
            return
        }
        if (data.isOnGroup || filter.isOnGroup) {
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
            updateSelectedFilter={updateSelectedFilter}
            addParticipantToGroup={addParticipantToGroup}
            removeParticipantFromGroup={removeParticipantFromGroup}
            getGroupIdFromFilterId={getGroupIdFromFilterId} />

        <svg onClick={() => deleteFilter()} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-x-circle-fill ms-2" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
    </span>
}


function LabelParticipant({ filter, updateSelectedFilter,
    addParticipantToGroup, removeParticipantFromGroup,
    getGroupIdFromFilterId }) {

    async function getAuthorizedPart() {
        let def = ['COT', 'MAN', 'REP']
        switch (filter.type) {
            case 'package':
                return (filter.isOnGroup || filter.participants.includes('COT')) ? [] : ['COT']
            case 'cav':
                return def.filter(p => !filter.participants.includes(p))
            case 'carte':
                let participantsCarte = ['COT']
                if (filter.isOnGroup) {
                    let group = await getGroupIdFromFilterId(filter.id)
                    console.log(group)
                    let cav = group.contrats.filter(c => c.type === 'cav')
                    if (cav.length > 0) {
                        var cavMAN = cav[0].participants.filter(p => p.substring(0, 3) === 'MAN')
                        var cavREP = cav[0].participants.filter(p => p.substring(0, 3) === 'REP')
                        participantsCarte = cavMAN.length > 0 ? [...participantsCarte, ...cavMAN] : [...participantsCarte, 'MAN']
                        participantsCarte = cavREP.length > 0 ? [...participantsCarte, ...cavREP] : [...participantsCarte, 'REP']
                    } else participantsCarte = def
                } else participantsCarte = def
                return filter.participants.length > 0 ? [] : participantsCarte
            default:
                return def
        }
    }

    function addParticipant(part) {
        if (['MAN', 'REP'].includes(part)) {
            let index = filter.participants.filter(p => p.substring(0, 3) === part).length + 1
            part = part.concat(index.toString())
        }
        if (!filter.isOnGroup) {
            filter.participants = [...filter.participants, part]
            updateSelectedFilter(filter)
        } else {
            addParticipantToGroup(filter, part)
        }
    }

    async function deletePart(index) {
        if (!filter.isOnGroup) {
            filter.participants = filter.participants.filter((p, i) => i !== index)
            updateSelectedFilter(filter)
        } else {
            removeParticipantFromGroup(filter, index)
        }
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
            return <div key={index} className='participant ms-1' onClick={() => deletePart(index)}>{part}</div>
        })}
        {participants}
    </React.Fragment>
}
