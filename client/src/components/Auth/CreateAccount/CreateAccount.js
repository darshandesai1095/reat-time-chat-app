import { useState, useEffect } from 'react';
import createDatesArray from '../../../functions/createDatesArray';
import monthsArray from '../../../functions/monthsArray';
import createYearsArray from '../../../functions/createYearsArray';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase';
import './CreateAccount.css';

import { useSelector, useDispatch } from 'react-redux'
import { loginRequest, loginSuccess, loginFailure, logout } from '../../../redux/features/auth/authSlice';


const CreateAccount = ({goToLoginPage}) => {

    const dispatch = useDispatch()

    const datesArray = createDatesArray()
    const yearsArray = createYearsArray()

    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const createAccount = (event) => {
        event.preventDefault()
        dispatch(loginRequest())

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user
                console.log("new account created!", user)
                dispatch(loginSuccess(user))
            })
            .catch((error) => {
                setError(true)
                dispatch(loginFailure(error.message))
                alert("Account creation failed")
                console.log("doesn't work", error.message)
        })
    }
    

    return (
        <div className="create-account">
            <h3>Create an account</h3>
            <form className='create-account__form' onSubmit={(e) => createAccount(e)}>
                <div className='form__details'>
                    {
                        error ?
                        <p className='login__error-message'>EMAIL - <span>Email already in use.</span></p>
                        :
                        <p>EMAIL</p>
                    }
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                <div className='form__details'>
                    <p>USERNAME</p>
                    <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className='form__details'>
                    <p>PASSWORD</p>
                    <input
                        type="password"
                        pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        title="
                            At least 8 characters |
                            At least one letter |
                            At least one digit |
                            At least one special character;
                            !, @, #, $, %, ^, &, *
                        "
                    />
                </div>

                <button className='form__continue-button' type="submit">Continue</button>
            </form>
            <p className='already-have-an-account' onClick={goToLoginPage}>Already have an account?</p>
        </div>
    );
}

export default CreateAccount;


// At least 7 characters in length.
// At least one uppercase letter (A-Z).
// At least one lowercase letter (a-z).
// At least one digit (0-9).