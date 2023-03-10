

const FilterList = React.memo(function () {

    const [page, setPage] = useState("packages")

    let content = null
    if (page === "packages") {
        content = "packages"
    } else if (page === "cav") {
        content = "Comptes-chèques"
    } else if (page === "cartes") {
        content = "Autres"
    }

    return <div style={{ gridArea: 'b' }} className="container">
        <Tabs currentPage={page} onChangePage={setPage} />
        {content}
    </div>
})

export default FilterList

function Tabs({ currentPage, onChangePage }) {

    const classNav = function (page) {
        let className = "nav-link"
        if (page === currentPage) {
            className = "nav-link active"
        }
        return className
    }

    return <ul className="nav nav-tabs">
        <li className="nav-item">
            <a onClick={() => onChangePage("packages")} className={classNav('packages')} href="#">Packages</a>
        </li>
        <li className="nav-item">
            <a onClick={() => onChangePage("cav")} className={classNav('cav')} href="#">Comptes-chèques</a>
        </li>
        <li className="nav-item">
            <a onClick={() => onChangePage("cartes")} className={classNav('cartes')} href='#'>Cartes</a>
        </li>
    </ul>
}