import React, { useState, useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import '../../css/main.css';
import titleImage from "../../assets/images/tit_icon.png";
import useInput from '../hooks/useInput';

import { getOnePost, deletePost } from '../../repository/PostRepository';
import Check from '../Check';

export default function BoardDetail() {
    const params = useParams();
    const [title,titleInput,setTitle] = useInput({type: "text", readonly:"true", style: "essentiality"});
    const [intro,introInput,setIntro] = useInput({type: "textarea", readonly:"true", style: "essentiality"});
    const [type,setType] = useState("DEFAULT");
    const [use,setUse] = useState("DEFAULT");
    const [success,setSuccess] = useState(false);

    useEffect(()=>{
        async function fetchData() {
            try {
                const res = await getOnePost({id:params.id});
                if(res.data.dataExists!=="false") {
                    const data = await Promise.all(
                        res.data.map(async (val)=> { 
                            return {
                                bd_subject: val.bd_subject,
                                bd_intro: val.bd_intro, 
                                bd_type: val.bd_type, 
                                bd_use_at: val.bd_use_at
                            }
                        })
                    )
                    setTitle(data[0].bd_subject);
                    setIntro(data[0].bd_intro);
                    setType(data[0].bd_type);
                    setUse(data[0].bd_use_at);

                }
            } catch(e) {
                console.error(e);
            }
        }
        fetchData() 
    },[params, setTitle, setIntro, setType, setUse])

    const handleDelete = async () => {
        await deletePost({id: Number(params.id)});
        setSuccess(true);
    }

    return (
        <div className="content_pop">
            <div className="wTableFrm">
                <Check/>
                {success&&<Redirect to="/admin"/>}
                <img src={titleImage} alt=""/>
                <h2>게시판 등록</h2>
                <table className="wTable" summary="게시판의 내역에 대한 목록을 출력합니다.">
                    <caption>게시판 등록</caption>
                    <colgroup>
                        <col style={{width: 20+"%"}}/>
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th><label htmlFor="bbsNm">게시판명 <span className="pilsu">*</span></label></th>
                            <td className="left">
                                {title}
                                <div></div>
                            </td>
                        </tr>
                    
                        <tr>
                            <th><label htmlFor="bbsIntrcn">게시판소개내용 <span className="pilsu">*</span></label></th>
                            <td className="nopd ">
                                {intro}
                                <div></div>  
                            </td>
                        </tr>
                            
                        <tr>
                            <th><label htmlFor="bbsTyCode">게시판 유형 <span className="pilsu">*</span></label></th>
                            <td className="left">
                                {type}
                                <div></div>       
                            </td>
                        </tr>
                        <tr>
                            <th><label htmlFor="useAt">사용여부 <span className="pilsu">*</span></label></th>
                            <td className="left">
                                {use}
                                <div></div>       
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="btn">
                    <span className="btn_s"><Link to={`/boardUpdate/${params.id}`}>수정</Link></span>
                    <span className="btn_s" onClick={handleDelete}><Link>삭제</Link></span>
                    <span className="btn_s"><Link to="/admin/">목록</Link></span>
                </div><div style={{clear: "both"}}></div>
	
            </div>
        </div>
        
    )
}
