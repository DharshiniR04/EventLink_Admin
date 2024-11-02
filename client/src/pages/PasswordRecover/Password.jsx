import React from 'react';
import './Password.css';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import passRecoverImg from '../../assets/passRecover.png';
import { useNavigate } from 'react-router-dom';


function Password() {

    const navi = useNavigate();

    const handleBack = () => {
        window.history.back();
    };


    const handlePasswordRecovery = async (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value;
        console.log(email);
        try {
            const response = await axios.get("http://localhost:5100/api/auth/passwordRecovery", {
                params: { email: email }
            });
            if (response.data.message === "Recovery mail sent") {
                alert("Recovery mail sent");
                navi('../login');
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='password'>
            <div className="password-actions">
                <FaArrowLeft className="back-arrow" onClick={handleBack} />
            </div>
            <div className="password-recover">
                <img src={passRecoverImg} alt='password-img' />
                <h2 className='password-recover-head'>Password Recovery</h2>
                <p>No Worries. We'll send you instructions.</p>
                <form className='password-recover-form' onSubmit={handlePasswordRecovery}>
                    <label >Email address</label>
                    <input placeholder='Enter your email' name='email' type='email'></input>
                    <button className='password-recover-btn' type='submit'>Reset password</button>
                </form>
            </div>
        </div>
    )
}

export default Password;