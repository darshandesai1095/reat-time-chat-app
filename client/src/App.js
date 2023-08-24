import './App.css';
import LoadingPage from './LoadingPage/LoadingPage';
import LoadingModal from './components/AllModals/LoadingModal/LoadingModal';
import AuthenticationPage from './components/Auth/AuthenticationPage/AuthenticationPage'
import MainPage from './components/MainPage/MainPage';
import { useSelector } from 'react-redux'

const App = () => {

  const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  return (
      <div className="App">
        
        {/* <LoadingPage/> */}

        { isAuthenticated ? <MainPage/> : <AuthenticationPage/> }

      </div>
  );
}

export default App;