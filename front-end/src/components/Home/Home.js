import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import './style.css';
import useInput from '../hooks/useInput';
import { login, getUser } from '../../repository/AuthRepository';


export default function Home() {
    const [uid,uidInput] = useInput({type: "text", style: "login_form"});
    const [password, passwordInput] = useInput({type: "password", style: "login_form"});
    const [isLogin, setIsLogin] = useState(sessionStorage.getItem("id"));
    const [isAdmin, setIsAdmin] = useState("default");

    useEffect(()=> {
        if(isLogin!==null) {
            const fetchUser = async () => {
                const res = await getUser({uid:isLogin});
                setIsAdmin(res.data[0]?.isAdmin);
            }
            fetchUser();
        }
    },[setIsAdmin])

    const BranchLogin = () => {
        if(isAdmin===true) {
            return (<Redirect to='/admin'/>);
        } else if(isAdmin===false) {
            return (<Redirect to='/userboard'/>)
        } 
        return <></>
    }
    
    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await login({uid:uid,password:password});
        if(res.data.dataExists==="false") {
            alert("아이디 또는 비밀번호가 올바르지 않습니다.");
            return ;
        }
        sessionStorage.setItem("id",res.data[0].uid);
        setIsAdmin(res.data[0].isAdmin);
    }
    
    return (
        
        <div className="wrapper">
            <BranchLogin/>
            <form>
                <div className="inputbox">
                    <h1>아이디</h1>
                    {uidInput}
                </div>
                <div className="inputbox">
                    <h1>비밀번호</h1>
                    {passwordInput}
                </div>
                <button className="btn_login" onClick={handleLogin}>로그인</button>
                <div className="goRegi">
                    <Link to='/userRegister'>회원가입</Link>
                </div>
            </form>
        </div>
    )
}
