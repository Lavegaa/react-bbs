import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import './Ruserstyle.css';
import useInput from '../hooks/useInput';
import { addUser } from '../../repository/AuthRepository';

export default function UserRegister() {
    const [uid,uidInput] = useInput({type: "text", style: "login_form"});
    const [password, passwordInput] = useInput({type: "password", style: "login_form"});
    const [name, nameInput] = useInput({type: "text", style: "login_form"});
    const [admin, setAdmin] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleAdmin = (who) => {
        setAdmin(who);
    }

    const handleSubmit = (uid, password, name, admin) => {
        if(uid===""||password===""||name==="") {
            alert("정보를 입력해주세요.");
            return ;
        }
        addUser({uid: uid, password: password, name: name, isAdmin: admin});
        setSuccess(true);
    }

    return (
        <div className="Rwrapper">
            {success&&<Redirect to="/"/>}
            <form>
                <div className="regi">회원가입</div>
                <div className="Rinputbox">
                    <h1>아이디</h1>
                    {uidInput}
                </div>
                <div className="Rinputbox">
                    <h1>비밀번호</h1>
                    {passwordInput}
                </div>
                <div className="Rinputbox">
                    <h1>이름</h1>
                    {nameInput}
                </div>
                <div className={`btn_admin left ${admin||"selected"}`} onClick={()=>handleAdmin(false)}>사용자</div>
                <div className={`btn_admin ${admin&&"selected"}`} onClick={()=>handleAdmin(true)}>관리자</div>
                <button className="btn_login" onClick={()=>handleSubmit(uid,password,name,admin)}>가압하기</button>
                
            </form>
        </div>
    )
}
