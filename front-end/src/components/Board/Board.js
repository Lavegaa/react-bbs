import React from 'react'
import { Link } from 'react-router-dom';
import BoardNav from '../BoardNav';
import BoardList from '../BoardList'
import '../../css/main.css';
import './board.css';
import titleImage from "../../assets/images/tit_icon.png";
import Logout from '../Logout';
import Check from '../Check';
export default function Board() {
    const handleManage = () => {

    }
    return (
        <div className="content_pop">
            <div className="board">
            <Check/>
            <Logout/>
            <Link to="/manage" className="manage">회원관리</Link>
            <img src={titleImage} alt=""/>
	        <h1>게시판 목록</h1>
            <BoardNav/>
            <BoardList/>
	    </div>
        </div>
        
    )
}

