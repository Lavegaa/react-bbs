import React, { useState, useEffect} from 'react'
import { Redirect, Link } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import { getBoardList, makeBoard } from '../../../repository/BoardRepository';
import { getPostList  } from '../../../repository/PostRepository';

import btn_r from '../../../assets/images/btn_bg_r.gif';
import title_dot from '../../../assets/images/title_dot.gif';



export default function UserBoardPost() {
    const [subject, subjectInput] = useInput({type: "text", maxLength: "10", style: "txt"});
    const [type, setType] = useState("DEFAULT");
    const [description, descriptionInput] = useInput({type: "textarea",row: 5, cols: 58, style: "description"});
    const [register, registerInput] = useInput({type: "text", maxLength: "10", style: "regUser"});
    const [success,setSuccess] = useState(false);

    const [boards, setBoards] = useState([]);
    useEffect(()=>{
        async function fetchData() {
            try {
                const res = await getPostList({user:"true"});
                if(res.data.dataExists!=="false") {
                    const data = await Promise.all(
                        res.data.map(async (val)=> { 
                            return {
                                bd_id: val.bd_id,
                                bd_subject: val.bd_subject,
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

    const handleSelect = (e) => {
        setType(e.target.value);
    }

    const handlePost = (subject,
                        type,
                        description) => {
        if(subject===""||
           description==="") {
               alert('필수사항을 입력해주세요.')
               return ;
           }

        makeBoard({
            ub_subject: subject,
            ub_type: type,
            ub_description: description,
            ub_host: sessionStorage.getItem("id")
        }).then(()=>{
            setSuccess(true);
        })
    } 

    return (
        <div>
            {success&&<Redirect to="/userboard"/>}
            <div className="content_pop">
                <div id="title">
                    <ul>
                        <li><img src={title_dot} alt=""/>
                            게시물 등록
                        </li>
                    </ul>
                </div>
                <div id="table">
                    <table width="100%" border="1" cellPadding="0" cellSpacing="0" style={{borderColor: "#D3E2EC", borderColorDark: "#FFFFFF",  borderTop:"#C2D0DB"+ 2+"px olid", borderLeft:"#ffffff"+ 1+"px solid", borderRight:"#ffffff"+ 1+"px", borderBottom:"#C2D0DB"+ 1+"px solid", borderCollapse: "collapse"}}>
                        <colgroup>
                            <col width="150"/>
                            <col width="?"/>
                        </colgroup>
                        <tbody>
                            <tr style={{borderBottom: 1+"px solid #C2D0DB"}}>
                                <td className="tbtd_caption"><label htmlFor="id">카테고리</label></td>
                                <td className="tbtd_content">
                                    <select id="useYn" name="useYn" className="use" onChange={handleSelect}>
                                        <option value="DEFAULT" select="true">선택하세요</option>
                                        {boards.map((val=>{
                                            return <option key={val.bd_id} value={`${val.bd_subject}`}>{val.bd_subject}</option>
                                        }))}
                                    </select>
                                </td>
                            </tr>
                            
                            <tr style={{borderBottom: 1+"px solid #C2D0DB"}}>
                                <td className="tbtd_caption"><label htmlFor="name">제목</label></td>
                                <td className="tbtd_content">
                                    {subjectInput}
                                    &nbsp;
                                </td>
                            </tr>
                            <tr style={{borderBottom: 1+"px solid #C2D0DB"}}>
                                <td className="tbtd_caption"><label htmlFor="description">내용</label></td>
                                <td className="tbtd_content">
                                    {descriptionInput}
                                    &nbsp;
                                </td>
                            </tr>
                        </tbody>
                        
                    </table>
                </div>
                <div id="sysbtn">
                    <ul>
                        <li>
                            <span className="btn_blue_l">
                                <button style={{background:"none", color:"black"}} onClick={()=>handlePost(subject, type, description, register)}>등록</button>
                                <img src={btn_r} style={{marginLeft:6+"px"}} alt=""/>
                            </span>
                        </li>
                        <li>
                            <span className="btn_blue_l">
                                <Link to="/userboard" style={{background:"none", color:"black", fontWeight:700}}>목록</Link>
                                <img src={btn_r} style={{marginLeft:6+"px"}} alt=""/>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
