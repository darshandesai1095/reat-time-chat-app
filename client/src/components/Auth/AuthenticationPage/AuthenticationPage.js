import { useState } from 'react';
import './AuthenticationPage.css';
import Login from '../Login/Login';
import CreateAccount from '../CreateAccount/CreateAccount';

const AuthenticationPage = () => {

  const [login, setLogin] = useState(true) // true for login page, false for register page
  const goToRegistrationPage = () => setLogin(false)
  const goToLoginPage = () => setLogin(true)

  return (
    <div className="authentication-page">

        {
          login ? (

            <Login
              goToRegistrationPage={goToRegistrationPage}
            />

          ) : (

            <CreateAccount
              goToLoginPage={goToLoginPage}
            />

          )
        }
        
    </div>
  );
}

export default AuthenticationPage;