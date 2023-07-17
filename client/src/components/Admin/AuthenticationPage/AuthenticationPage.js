import { useState, useEffect } from 'react';
import './AuthenticationPage.css';
import Login from '../Login/Login';
import CreateAccount from '../CreateAccount/CreateAccount';

const AuthenticationPage = () => {


  return (
    <div className="authentication-page">
        <Login/>
        {/* <CreateAccount/> */}
    </div>
  );
}

export default AuthenticationPage;
