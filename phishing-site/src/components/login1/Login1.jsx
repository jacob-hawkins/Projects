import React from 'react';
import './login1.css';
import { Apple } from '@mui/icons-material';
import Google from '../../media/google.png';
import { useNavigate } from 'react-router-dom';

export default function Login1() {
    const navigate = useNavigate();

    const getUsername = (event) => {
        event.preventDefault();

        let username = document.getElementById('username').value;
        navigate('/login', { state: { username: { username } } });
    };

    return (
        <div className='main'>
            <div className='form'>
                <h1 className='title'>Sign in to Twitter</h1>

                <a href='https://google.com' className='button'>
                    <img src={Google} alt='' id='googleLogo' />
                    <p>Sign in with Google</p>
                </a>
                <a href='https://apple.com' className='button' id='apple'>
                    <Apple id='appleLogo' />
                    <p>Sign in with Apple</p>
                </a>

                <div className='orSection'>
                    <hr />
                    <p>or</p>
                    <hr />
                </div>

                <form onSubmit={getUsername} autocomplete='off'>
                    <input
                        type='text'
                        id='username'
                        placeholder='Phone, email, or username'
                        required
                    />
                    <button type='submit' className='button'>
                        Next
                    </button>
                </form>

                <a
                    href='https://twitter.com/i/flow/password_reset?input_flow_data=%7B%22requested_variant%22%3A%22eyJwbGF0Zm9ybSI6IlJ3ZWIifQ%3D%3D%22%7D'
                    className='button'
                    id='forgotPassword'>
                    Forgot password?
                </a>

                <p id='noAccountText'>
                    Don't have an account?
                    <a href='https://twitter.com/i/flow/signup' id='noAccountLink'>
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
