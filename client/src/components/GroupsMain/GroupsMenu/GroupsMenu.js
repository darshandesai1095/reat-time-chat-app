import NewChat from '../NewChat/NewChat';
import Search from '../Search/Search';
import './GroupsMenu.css';

const GroupsMenu = () => {

    return (
        <div className="groups-menu" >
            <Search/>
            <NewChat/>
        </div>
    );
}

export default GroupsMenu;