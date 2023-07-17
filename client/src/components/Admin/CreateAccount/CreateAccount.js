import { useState, useEffect } from 'react';
import createDatesArray from '../../../functions/createDatesArray';
import monthsArray from '../../../functions/monthsArray';
import createYearsArray from '../../../functions/createYearsArray';
import './CreateAccount.css';

const CreateAccount = () => {

    const datesArray = createDatesArray()
    const yearsArray = createYearsArray()
    

    return (
        <div className="create-account">
            <h3>Create an account</h3>
            <form className='create-account__form'>
                <div className='form__details'>
                    <p>EMAIL</p>
                    <input
                        type="text"
                        
                    />
                </div>
                
                <div className='form__details'>
                    <p>USERNAME</p>
                    <input
                        type="text"
                    />
                </div>

                <div className='form__details'>
                    <p>PASSWORD</p>
                    <input
                        type="text"
                    />
                </div>

                <div className='form__details'>
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
                </div>            

                <button className='form__login-button'>Continue</button>
            </form>
            <p className='already-have-an-account'>Already have an account?</p>
        </div>
    );
}

export default CreateAccount;
