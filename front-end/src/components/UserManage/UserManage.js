import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getAllUser, deleteUser } from '../../repository/AuthRepository';
import './manage.css'
import titleImage from "../../assets/images/tit_icon.png";

const Item = ({uid,name,isAdmin}) => {
    const handleDelete = (uid) => {
        deleteUser({uid:uid});
        window.location.reload(false);
    }

    return (
        <tr>
            <td colSpan="1">
                {uid}
            </td>
            <td colSpan="1">
                {name}
            </td>
            <td colSpan="1">
                {isAdmin?"관리자":"사용자"}
            </td>
            <td colSpan="1">
                <div className="btn_d" onClick={()=>handleDelete(uid)}>삭제</div>
            </td>
        </tr>
    )
}

export default function UserManage() {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        async function fetchData() {
            try {
                const res = await getAllUser();
                if(res.data.dataExists!=="false") {
                    const data = await Promise.all(
                        res.data.map(async (val)=> { 
                            return {
                                uid: val.uid,
                                name: val.name, 
                                isAdmin: val.isAdmin, 
                            }
                        })
                    )
                    setUsers(data);
                }
            } catch(e) {
                console.error(e);
            }
        }
        fetchData(); 
    },[setUsers])

    return (
        <div className="content_pop">
            <div className="board">
                <img src={titleImage} alt=""/>
                <h1 className="title_manage">사용자 관리</h1>
            </div>
            
            <div className="search_box">
                <ul>
                    <li>
                        <span className="btn_b"><Link to="/admin" title="등록 버튼">뒤로</Link></span>
                    </li>
                </ul>
            </div>
            <table className="board_list" summary="게시판의 내역에 대한 목록을 출력합니다.">
                <caption>게시판목록</caption>
                <colgroup>
                    <col style={{width: 20+"%"}}/>
                    <col style={{width: 20+"%"}}/>
                    <col style={{width: 13+"%"}}/>
                    <col style={{width: 13+"%"}}/>
                </colgroup>
                <thead>
                    <tr>
                        <th>아이디</th>
                        <th>유저명</th>
                        <th>권한</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody className="ov">
                    {users.map(val=>{
                        return <Item uid={val.uid} name={val.name} isAdmin={val.isAdmin}/>
                    })}     
                </tbody>
            </table>
        </div>
    )
}


