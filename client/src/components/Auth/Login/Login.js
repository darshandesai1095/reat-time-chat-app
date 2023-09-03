import { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../../firebase';
import './Login.css';
import InstructionsSentPopup from '../InstructionsSentPopup/InstructionsSentPopup';
import validator from 'validator';
import { useDispatch } from 'react-redux'
import { loginRequest, loginSuccess, loginFailure } from '../../../redux/features/users/userSlice';


const Login = ({goToRegistrationPage}) => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [showPopup, setShowPopup] = useState(false)

    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(loginRequest)        

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            dispatch(loginSuccess({
                firebaseUserId: userCredential.user.uid,
                email: email
            }))
        } catch (error) {
            setError(true)
            dispatch(loginFailure)
        }
 
    }

    const handleForgottenPasssword = (email) => {
        if (validator.isEmail(email)) {
            setShowPopup(true)
            sendPasswordResetEmail(auth, email)
            .catch((error) => {
                console.log(error)
            }) 
        } else {
            setIsEmailValid(false)
            console.log("invalid email")
        }
    }

    const displayEmailHeading = () => {
        if (!isEmailValid) {
            return (<p className='login__error-message'>EMAIL - <span>Email is invalid.</span></p>)
        } 
        if (error) {
            return (<p className='login__error-message'>EMAIL - <span>Login or password is invalid.</span></p>)
        }
        return (<p>EMAIL&nbsp;<span className='form__required'>*</span></p>)
    }


    return (
        <>
        <InstructionsSentPopup 
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            email={email}
        />
        
        <div className="login">
            <h3>Welcome back!</h3>
            <h4>We're so excited to see you again!</h4>
            <form className='login__form' onSubmit={(e) => handleLogin(e)}>
                <div className='form__email'>
                    { displayEmailHeading() }
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                <div className='form__password'>
                    {
                        error ?
                        <p className='login__error-message'>PASSWORD - <span>Login or password is invalid.</span></p>
                        :
                        <p>PASSWORD&nbsp;<span className='form__required'>*</span></p>
                    }
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            
            <p className='forgot-your-password' onClick={() => handleForgottenPasssword(email)}>Forgot your pasword?</p>

                <button className='form__login-button' type="submit">Log In</button>
            </form>
            <div className='login__need-an-account'>
                <p>Need an account?&nbsp;<span onClick={goToRegistrationPage}>Register</span></p>
            </div>
        </div>

        </>
    );
}

export default Login;