import { useState, useEffect } from 'react';
import './Login.css';

const Login = () => {



  return (
    <div className="login">
        <h3>Welcome back!</h3>
        <h4>We're so excited to see you again!</h4>
        <form className='login__form'>
            <div className='form__email'>
                <p>EMAIL&nbsp;<span className='form__required'>*</span></p>
                <input
                    type="text"
                    
                />
            </div>
            
            <div className='form__password'>
                <p>PASSWORD&nbsp;<span className='form__required'>*</span></p>
                <input
                    type="text"
                />
            </div>
           
           <p className='forgot-your-password'>Forgot your pasword?</p>

            <button className='form__login-button'>Log In</button>
        </form>
        <div className='login__register'>
            <p>Need an account?&nbsp;<span>Resister</span></p>
        </div>
    </div>
  );
}

export default Login;
