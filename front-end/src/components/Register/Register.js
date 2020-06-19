import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../../css/main.css';
import titleImage from "../../assets/images/tit_icon.png";
import useInput from '../hooks/useInput';

import { makePost, getPostList } from '../../repository/PostRepository';

export default function Register() {
    
    const [title,titleInput] = useInput({type: "text"});
    const [intro,introInput] = useInput({type: "textarea"});
    const [type,setType] = useState("DEFAULT");
    const [use,setUse] = useState("DEFAULT");
    const [success,setSuccess] = useState(false);

    const handleSelect = (setValue) => (e) => {
        setValue(e.target.value);
    }

    const post = (bd_subject,
                  bd_intro, 
                  bd_type, 
                  bd_use_at) => {
        if(bd_subject==="DEFAULT" || 
           bd_intro==="DEFAULT" || 
           bd_type==="DEFAULT" || 
           bd_use_at==="DEFAULT") {
               alert(`필수 선택사항을 선택해 주세요.`);
               return ;
           }

        makePost({
            bd_subject: bd_subject,
            bd_intro: bd_intro, 
            bd_type: bd_type, 
            bd_use_at: bd_use_at
        }).then((val)=>{
            if(val.data.dataExists==="true") {
                alert("중복된 게시판명 입니다.");
                return ;
            } else {
                setSuccess(true);
            }
        })

    }

    return (
        <div className="content_pop">
            <div className="wTableFrm">
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
                            {titleInput}
                            <div></div>
                        </td>
                    </tr>
                
                    <tr>
                        <th><label htmlFor="bbsIntrcn">게시판소개내용 <span className="pilsu">*</span></label></th>
                        <td className="nopd">
                            {introInput}
                            <div></div>  
                        </td>
                    </tr>
                        
                    <tr>
                        <th><label htmlFor="bbsTyCode">게시판 유형 <span className="pilsu">*</span></label></th>
                        <td className="left">
                            <select id="bbsTyCode" name="bbsTyCode" className="txt" title="게시판 유형 입력" onChange={handleSelect(setType)}>
                                <option value="DEFAULT">--선택하세요--</option>
                                <option value="통합게시판">통합게시판</option><option value="블로그형게시판">블로그형게시판</option><option value="방명록">방명록</option>
                            </select>
                            <div></div>       
                        </td>
                    </tr>
                    	
                    <tr>
                        <th><label htmlFor="useAt">사용여부 <span className="pilsu">*</span></label></th>
                        <td className="left">
                            <select id="useAt" name="useAt" className="txt" title="사용여부 입력" onChange={handleSelect(setUse)}>
                                <option value="DEFAULT">--선택하세요--</option>
                                <option value="Y">예</option>
                                <option value="N">아니오</option>
                            </select>
                            <div></div>       
                        </td>
                    </tr>
	            </tbody>
            </table>

            <div className="btn">
                <input type="button" className="s_submit" value="등록" title="등록 버튼" onClick={()=>post(title, intro, type, use)}/>
                <span className="btn_s"><Link to="/admin" title="목록  버튼">목록</Link></span>
            </div><div style={{clear: "both"}}></div>
	
        </div>
        </div>
        
    )
}
