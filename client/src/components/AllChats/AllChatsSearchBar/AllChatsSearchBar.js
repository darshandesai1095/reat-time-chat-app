import './AllChatsSearchBar.css';
import { useRef } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useDispatch, useSelector } from 'react-redux';
import { resetMatchCount } from '../../../redux/features/search/searchRoomsSlice';

const AllChatsSearchBar = ({search, setSearch}) => {

    const dispatch = useDispatch()
    const totalMatches = useSelector(state => state.searchRooms.totalMatches)
    const inputRef = useRef()
    const handleSearch = (e) => {
        dispatch(resetMatchCount())
        setSearch(e.target.value)
    }
    const cancelSearch = () => {
        dispatch(resetMatchCount())
        setSearch("")
    }

    return (
        <div className='all-chats-header'>
            <div className="all-chats__search-bar" >
                <SearchIcon
                    onClick={() => {inputRef.current.focus()}}
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => handleSearch(e)}
                    placeholder="Search"
                    ref={inputRef}
                />
                <CloseRoundedIcon 
                    className={`clear-search ${search.trim().length > 0 ? "show-clear-search" : "hide-clear-search"}`}
                    onClick={cancelSearch}
                />
            </div>
                {
                    <div className={`all-chats-header__match-count ${totalMatches > 0 ? "show-count" : "hide-count"}`}>
                        <p className='match-count__display'> 
                        { `${totalMatches === 1 ? "1 result" : `${totalMatches} results`} `} 
                        </p>
                    </div>

                }

        </div>
    )
}

export default AllChatsSearchBar;