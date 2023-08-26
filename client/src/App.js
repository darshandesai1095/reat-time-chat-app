import './App.css';
import AuthenticationPage from './components/Auth/AuthenticationPage/AuthenticationPage'
import MainPage from './components/MainPage/MainPage';
import { useSelector } from 'react-redux'

const App = () => {

  const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  return (
      <div className="App">
        
        { isAuthenticated ? <MainPage/> : <AuthenticationPage/> }

      </div>
  );
}

export default App;