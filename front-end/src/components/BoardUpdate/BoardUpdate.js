import React, { useState, useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import '../../css/main.css';
import titleImage from "../../assets/images/tit_icon.png";
import useInput from '../hooks/useInput';

import { getOnePost, updatePost } from '../../repository/PostRepository';
import Check from '../Check';

export default function BoardUpdate() {
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
        fetchData().then(()=>{
        });        
    },[params, setTitle, setIntro, setType, setUse])


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
        updatePost({
            id: params.id,
            bd_intro: bd_intro, 
            bd_type: bd_type, 
            bd_use_at: bd_use_at
        }).then(()=>{
            setSuccess(true);
        })
    }

    return (
        <div className="wTableFrm">
            <Check/>
            {success&&<Redirect to={`/board/${params.id}`}/>}
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
                            <select id="bbsTyCode" name="bbsTyCode" className="txt" title="게시판 유형 입력" onChange={handleSelect(setType)} value={type}>
                                <option value="DEFAULT">--선택하세요--</option>
                                <option value="통합게시판">통합게시판</option><option value="블로그형게시판">블로그형게시판</option><option value="방명록">방명록</option>
                            </select>
                            <div></div>       
                        </td>
                    </tr>	
                    <tr>
                        <th><label htmlFor="useAt">사용여부 <span className="pilsu">*</span></label></th>
                        <td className="left">
                            <select id="useAt" name="useAt" className="txt" title="사용여부 입력" onChange={handleSelect(setUse)} value={use}>
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
                <span className="btn_s"  onClick={()=>post(title, intro, type,use)}><Link>수정</Link></span>
                <span className="btn_s"><Link to={`/board/${params.id}`} title="목록  버튼">뒤로</Link></span>
            </div><div style={{clear: "both"}}></div>
	
        </div>
    )
}
