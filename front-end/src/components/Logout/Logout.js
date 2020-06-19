import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'; 
import './logout.css';

export default function Logout() {
    const [logout,setLogout] = useState(false);
    const handleLogout = () => {
        sessionStorage.clear();
        setLogout(true);
    }
    return (
        <div className="logout" onClick={handleLogout}>
            {logout&&<Redirect to='/'/>}
            로그아웃
        </div>
    )
}
