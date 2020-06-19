import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import  '../../../css/userboard.css';
import './style.css';

import  btn_r  from '../../../assets/images/btn_bg_r.gif';
import  title_dot  from '../../../assets/images/title_dot.gif';

import { getBoardList } from '../../../repository/BoardRepository';
import { getPostList } from '../../../repository/PostRepository';
import Logout from '../../Logout';


const BranchItems = ({boards}) => {
    if(boards.length===0) {
        return (
            <tr>
                <td colSpan="5" style={{textAlign:"center"}}>자료가 없습니다. 다른 검색조건을 선택해주세요</td>
            </tr>
        )
    } else {
        return(
            boards.map((val)=>{
                return (
                    <Item key={val.ub_id} ub_id={val.ub_id} ub_type={val.ub_type} ub_subject={val.ub_subject} ub_description={val.ub_description} ub_create_date={val.ub_create_date} ub_host={val.ub_host}/>
                )
            })
        )
    }
}

const Item = ({ub_id, ub_type, ub_subject, ub_create_date, ub_description, ub_host}) => {
    return (
		<tr>
			<td align="center" className="listtd">{ub_id}</td>
			<td align="center" className="listtd">{ub_type}</td>
			<td align="center" className="listtd"><Link to={`/post/${ub_id}`}>{ub_subject}&nbsp;</Link></td>
			<td align="center" className="listtd">{ub_description.substr(0,20)}&nbsp;</td>
            <td align="center" className="listtd">{ub_create_date.substr(0,10)}&nbsp;</td>
			<td align="center" className="listtd">{ub_host}&nbsp;</td>
		</tr>
    )
}

export default function UserBoardList() {
    const [title,setTitle] = useState("전체게시판");
    const [boards, setBoards] = useState([]);
    const [category, setCategory] = useState([]);
    
	useEffect(()=>{
        async function fetchCategoryData() {
            try {
                    const res = await getPostList({user:"true"});
                    if(res.data.dataExists!=="false") {
                        const data = await Promise.all(
                            res.data.map(async (val)=> { 
                                return {
                                    bd_id : val.bd_id,
                                    bd_subject: val.bd_subject,
                                }
                            })
                        )
                        setCategory(data);
                    }
            } catch(e) {
                console.error(e);
            }
        }
        async function fetchBoardData() {
            try {
                    const res = await getBoardList({type:"전체게시판"});
                    if(res.data.dataExists!=="false") {
                        const data = await Promise.all(
                            res.data.map(async (val)=> { 
                                return {
                                    ub_id: val.ub_id.trim(),
                                    ub_subject: val.ub_subject,
                                    ub_type: val.ub_type,
                                    ub_description: val.ub_description,
                                    ub_host: val.ub_host,
                                    ub_create_date: val.ub_create_date
                                }
                            })
                        )
                        setBoards(data);
                    }
            } catch(e) {
                console.error(e);
            }
        }
        fetchCategoryData();
        fetchBoardData();
    },[])

    const handleRoute = (subject) => {
        async function fetchBoardData(sub) {
            try {
                    const res = await getBoardList({type:sub});
                    if(res.data.dataExists!=="false") {
                        const data = await Promise.all(
                            res.data.map(async (val)=> { 
                                return {
                                    ub_id: val.ub_id.trim(),
                                    ub_subject: val.ub_subject,
                                    ub_type: val.ub_type,
                                    ub_description: val.ub_description,
                                    ub_host: val.ub_host,
                                    ub_create_date: val.ub_create_date
                                }
                            })
                        )
                        setBoards(data);
                    } else {
                        setBoards([]);
                    }
            } catch(e) {
                console.error(e);
            }
        }
        setTitle(subject);
        fetchBoardData(subject);
    }

    return (
        <div>
            
            
            <div className="content_pop">
                <Logout/>
                <div className="nav">
                    <div className="nav_item" onClick={()=>handleRoute("전체게시판")}>전체 게시판</div>
                    {
                        category.map(val=>{
                            return (
                                <div key={val.bd_id} className="nav_item" onClick={()=>handleRoute(val.bd_subject)}>{val.bd_subject}</div>
                            )
                        })
                    }
                </div>
                <div id="title">
                    <ul>
                        <li><img src={title_dot} alt=""/>{title}</li>
                    </ul>
                </div>
                <div id="table">
                    <table width="100%" border="0" cellPadding="0" cellSpacing="0" summary="카테고리ID, 케테고리명, 사용여부, Description, 등록자 표시하는 테이블">
                        <caption style={{visibility:"hidden"}}>카테고리ID, 케테고리명, 사용여부, Description, 등록자 표시하는 테이블</caption>
                        <colgroup>
                            <col width="40"/>
                            <col width="100"/>
                            <col width="150"/>
                            <col width="?"/>
                            <col width="80"/>
                            <col width="60"/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th align="center">No</th>
                                <th align="center">카테고리</th>
                                <th align="center">제목</th>
                                <th align="center">내용</th>
                                <th align="center">등록일자</th>
                                <th align="center">등록자</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <BranchItems boards={boards}/>
                        </tbody>

                    </table>
                </div>

                <div id="sysbtn">
                <ul>
                    <li>
                        <span  className="btn_blue_l">
                            <Link to="/userboardpost">등록</Link>
                            <img src={btn_r} style={{marginLeft:6+"px"}} alt=""/>
                        </span>
                    </li>
                </ul>
                </div>
            </div>
        </div>
    )
}
