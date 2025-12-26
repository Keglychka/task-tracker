import './TaskTracker.css'

export default function TaskSearch({ query, setQuery }) {
    return (
        <div>
            <input placeholder='Поиск..' className='search-input' type='search' value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
    )
}