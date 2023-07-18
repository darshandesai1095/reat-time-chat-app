import { useState, useEffect } from 'react';
import createDatesArray from '../../../functions/createDatesArray';
import monthsArray from '../../../functions/monthsArray';
import createYearsArray from '../../../functions/createYearsArray';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase';
import './CreateAccount.css';

const CreateAccount = ({goToLoginPage}) => {

    const datesArray = createDatesArray()
    const yearsArray = createYearsArray()

    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const createAccount = (event) => {
        event.preventDefault()

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user
                console.log("new account created!", user)
            })
            .catch((error) => {
                setError(true)
                // const errorCode = error.code
                // const errorMessage = error.message
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
                            At least one digit
                        "
                    />
                </div>

                {/* <div className='form__details'>
                    <p>DATE OF BIRTH</p>
                    <div className='dropdown'>

                        <select className='minimal'>
                            {
                                datesArray.map((date, i) => {
                                    return (
                                        <option value="1" key={i}>{date}</option>
                                    )
                                })
                            }
                        </select>
                        <select className='minimal'>
                            {
                                monthsArray.map((month, i) => {
                                    return (
                                        <option value="1" key={i}>{month}</option>
                                    )
                                })
                            }
                        </select>
                        <select className='minimal'>
                            {
                                yearsArray.map((year, i) => {
                                    return (
                                        <option value="1" key={i}>{year}</option>
                                    )
                                })
                            }
                        </select>
                        
                    </div>
                </div>             */}

                <button className='form__login-button continue-button' type="submit">Continue</button>
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