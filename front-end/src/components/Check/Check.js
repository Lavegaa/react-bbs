import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser } from '../../repository/AuthRepository';

export default function Check({who}) {
    const [session, setSession] = useState(sessionStorage.getItem("id"));
    const [type, setType] = useState("");
    const [user, setUser] = useState("");
    const [out, setOut] = useState(false);
    
    useEffect(()=>{
        

        const fetchUser = async () => {
            const res = await getUser({uid:session});
            if(res.data[0]?.isAdmin===undefined) {
                setOut(true);
            }
            setType(res.data[0]?.isAdmin);
        }
        fetchUser();
    })
    useEffect(()=>{
        if(session===null){
            alert("잘못된 접근입니다.");
            setOut(true);
        }
        if(who==="admin") {
            if(type===false) {
                alert("잘못된 접근입니다.");
                setUser(true);
            }
        }
        
    },[type])

    return (
        <div>
            {out&&<Redirect to="/"/>}
            {user&&<Redirect to="/userboard"/>}
        </div>
    )
}
