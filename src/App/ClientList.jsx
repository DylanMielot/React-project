function ClientList({ isLoading, neverRun }) {

    // a terme => a mettre dans le composant App
    const [client, setClient] = React.useState([])

    let content = null
    if (client.length < 1) {
        if (neverRun && !isLoading) {
            content = <h4 className="centerText">
                Lancer la recherche pour trouver des clients
            </h4>
        } else if (!isLoading) {
            content = <h4 className="centerText">Aucun client trouvé</h4>
        }
    } else {
        content = 'LISTE DES CLIENTS TROUVES'
    }


    return <div className='clientList'>
        <List content={content} isLoading={isLoading} />
    </div>
}

function List({ content, isLoading }) {

    let loader = null
    if (isLoading) {
        loader = <div style={{ width: '3rem', height: '3rem' }}
            className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    }

    return <div style={{ height: '100%' }}>
        {content}
        <div className="centerText">
            {loader}
        </div>
    </div>
}
