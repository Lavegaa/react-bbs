import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getPostList } from '../../repository/PostRepository';


const BranchItems = ({boards}) => {
    if(boards.length===0) {
        return (
            <tr>
                <td colSpan="5">자료가 없습니다. 다른 검색조건을 선택해주세요</td>
            </tr>
        )
    } else {
        return(
            boards.map((val)=>{
                return (
                    <Item key={val.bd_id} id={val.bd_id} name={val.bd_subject} host={val.bd_type} day={val.bd_create_date} use={val.bd_use_at}/>
                )
            })
        )
        
    }
    
}

const Item = ({id,name,day,use}) => {
    return (
        <tr>
            <td colSpan="1">
                {id}
            </td>
            <td colSpan="1">
                <Link to={`/board/${id}`}>{name}</Link>
            </td>
            <td colSpan="1">
                관리자
            </td>
            <td colSpan="1">
                {day.substr(0,10)}
            </td>
            <td colSpan="1">
                {use}
            </td>
        </tr>
    )
}

export default function BoardList() {
    const [boards, setBoards] = useState([]);
    useEffect(()=>{
        async function fetchData() {
            try {
                const res = await getPostList();
                if(res.data.dataExists!=="false") {
                    const data = await Promise.all(
                        res.data.map(async (val)=> { 
                            return {
                                bd_id: val.bd_id.trim(),
                                bd_subject: val.bd_subject,
                                bd_intro: val.bd_intro,
                                bd_type: val.bd_type.trim(),
                                bd_apply: val.bd_apply,
                                bd_attach_file: val.bd_attach_file,
                                bd_file_number: val.bd_file_number,
                                bd_create_date: val.bd_create_date,
                                bd_option: val.bd_option,
                                bd_use_at: val.bd_use_at
                            }
                        })
                    )
                    setBoards(data);
                }
            } catch(e) {
                console.error(e);
            }
        }
        fetchData();
    },[])

    return (
        <div>
            <table className="board_list" summary="게시판의 내역에 대한 목록을 출력합니다.">
                <caption>게시판목록</caption>
                <colgroup>
                    <col style={{width: 9+"%"}}/>
                    <col style={{width: 40+"%"}}/>
                    <col style={{width: 13+"%"}}/>
                    <col style={{width: 13+"%"}}/>
                    <col style={{width: 13+"%"}}/>
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th className="board_th_link">게시판명</th>
                        <th>등록자</th>
                        <th>등록일</th>
                        <th>사용여부</th>
                    </tr>
                </thead>
                <tbody className="ov">
                    <BranchItems boards={boards}/>
                </tbody>
            </table>
        </div>
    )
}
