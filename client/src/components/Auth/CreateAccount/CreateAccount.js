import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase';
import './CreateAccount.css';

import { useDispatch } from 'react-redux'
import { loginRequest, loginSuccess, loginFailure } from '../../../redux/features/auth/authSlice';
import { useCreateNewUserMutation } from '../../../redux/api/auth/authApi';


const CreateAccount = ({goToLoginPage}) => {


    const dispatch = useDispatch()
    const [createNewAccount, result] = useCreateNewUserMutation()

    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleCreateAccount = async (event) => {
        event.preventDefault()
        dispatch(loginRequest())
    
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            dispatch(loginSuccess({
                firebaseUserId: userCredential.user.uid,
                email: email,
                username: username,
            }))
            createNewAccount({
                firebaseUserId: userCredential.user.uid,
                email: email,
                username: username,
                profilePictureUrl: "test_url_string"
            })
          
        } catch (error) {
            setError(true)
            dispatch(loginFailure(error.message))
            alert("Account creation failed")
        }
    }


    return (
        <div className="create-account">
            <h3>Create an account</h3>
            <form className='create-account__form' onSubmit={(e) => handleCreateAccount(e)}>
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
                        pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        title="
                            At least 7 characters |
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
    )
}

export default CreateAccount;


// At least 7 characters in length.
// At least one uppercase letter (A-Z).
// At least one lowercase letter (a-z).
// At least one digit (0-9).



// const CreateAccount = () => {
//   const { data, error, isLoading } = useGetMessageQuery();

//   // If isLoading is true, the data is currently being fetched.
//   // You may show a loading indicator in your UI in this case.
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   // If there is an error, you can handle it or show an error message.
//   if (error) {
//     {console.log(error)}
//     return <div>Error: {error.message}</div>;
//   }

//   // If data exists, it means fetching was successful, and the data is up to date.
//   if (data) {
//     console.log("Data:", data);
//     // Render your component using the data
//     return <div>{/* Your component rendering logic using data */}</div>;
//   }

//   // If none of the above conditions match, the data is not available yet or there was no data.
//   return <div>No data available.</div>;
// };

// export default CreateAccount