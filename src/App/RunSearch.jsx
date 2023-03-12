function SearchButton({ isLoading, onClick }) {

    const [state, setState] = React.useState(["Rechercher des client", "primary", "#239ad1"])

    function handleClick() {
        if (isLoading) {
            onClick(false)
            setState(["Rechercher des clients", "primary", "#239ad1"])
        } else {
            onClick(true)
            setState(["Arrêter la recherche", "danger", "rgb(255 138 138)"])
        }
    }

    return <div className="footer">
        <div style={{ border: `solid 3px ${state[2]}` }}
            className={"btn btn-md btn-" + state[1]}
            onClick={() => handleClick()}>{state[0]}</div>
    </div>
}