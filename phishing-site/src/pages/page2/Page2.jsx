import './page2.css';
import Login2 from '../../components/login2/Login2';
import { Close, Twitter } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import React from 'react';

export default function Page2() {
    const location = useLocation();
    const username = location.state.username;

    return (
        <div className='page'>
            <div className='mainbox'>
                <div className='topbar'>
                    <span className='closebutton'>
                        <Close id='close' />
                    </span>
                    <Twitter id='twitterIcon' />
                </div>
                <div className='content'>
                    <Login2 text={username} />
                </div>
            </div>
        </div>
    );
}
