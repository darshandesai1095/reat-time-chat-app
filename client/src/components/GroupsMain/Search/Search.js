import './Search.css';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';

const Search = ({ connected, username, room, setRoom, joinRoom }) => {


  return (
    <div className="search" >
        <ManageSearchRoundedIcon/>
        <input
            type="text"
            placeholder='Search...'
        />
    </div>
  );
}

export default Search;