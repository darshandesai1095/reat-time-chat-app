import './AllChatsSearchBar.css';
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';

const AllChatsSearchBar = () => {

    const [search, setSearch] = useState(null)

    return (
        <div className="all-chats__search-bar" >
            <SearchIcon/>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
            />
        </div>
    )
}

export default AllChatsSearchBar;