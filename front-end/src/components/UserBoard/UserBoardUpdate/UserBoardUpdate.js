import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom';
import { getOneBoard, updateBoard } from '../../../repository/BoardRepository';
import { getUser } from '../../../repository/AuthRepository';
import useInput from '../../hooks/useInput';
import btn_r from '../../../assets/images/btn_bg_r.gif';
import title_dot from '../../../assets/images/title_dot.gif';

export default function UserBoardUpdate() {
    const params = useParams();
    const [id, idInput, setId] = useInput({type: "text", maxLength: "10", style: "essentiality", readonly: "true"});
    const [type, typeInput, setType] = useInput({type: "text", maxLength: "10", style: "txt", style: "essentiality", readonly: "true"});
    const [description, descriptionInput, setDescription] = useInput({type: "textarea",row: 5, cols: 58, style: "description"});
    const [subject, subjectInput, setSubject] = useInput({type: "text",row: 5, cols: 58, style: "description"});
    const [register, registerInput, setRegister] = useInput({type: "text", maxLength: "10", style: "essentiality", readonly: "true"});
    const [success,setSuccess] = useState(false);
    const [me, setMe] = useState([]);
    const [iam, setIam] = useState(false);

    const compare = (me,register) => {
        if(me.length&&register.length) {
            if(me[0]?.uid!==register) {
                alert("잘못된 접근입니다.");
                setIam(true);
            }
        }
    }
    useEffect(()=>{
        async function fetchData() {
            try {
                const res = await getOneBoard({id:params.id});
                if(res.data.dataExists!=="false") {
                    const data = await Promise.all(
                        res.data.map(async (val)=> { 
                            return {
                                ub_id: val.ub_id.trim(),
                                ub_type: val.ub_type,
                                ub_subject: val.ub_subject,
                                ub_description: val.ub_description,
                                ub_host: val.ub_host,
                            }
                        })
                    )
                    setId(data[0].ub_id);
                    setType(data[0].ub_type);
                    setDescription(data[0].ub_description);
                    setSubject(data[0].ub_subject)
                    setRegister(data[0].ub_host)
                }
            } catch(e) {
                console.error(e);
            }
        }
        async function fetchMe() {
            try {
                const res = await getUser({uid:sessionStorage.getItem("id")});
                if(res.data.dataExists!=="false") {
                    const data = await Promise.all(
                        res.data.map(async (val)=> { 
                            return {
                                uid: val.uid,
                                isAdmin: val.isAdmin,
                            }
                        })
                    )
                    setMe(data);
                }
            } catch(e) {
                console.error(e);
            }
        }
        fetchData();
        fetchMe();
    },[params, setId, setType, setSubject, setDescription, setRegister]);

    useEffect(()=>{
        compare(me,register);
    },[me,register]);

    const handleUpdate = async (params ,subject, description) => {
        if(subject===""||
           description==="") {
               alert('필수사항을 입력해주세요.')
               return ;
           }
        await updateBoard({id: params.id, ub_subject: subject, ub_description: description });
        setSuccess(true);
    }

    return (
        <div>
            {iam&&<Redirect to={`/post/${params.id}`}/>}
            {success&&<Redirect to={`/post/${params.id}`}/>}
            <div className="content_pop">
                <div id="title">
                    <ul>
                        <li><img src={title_dot} alt=""/>
                            게시물 수정
                        </li>
                    </ul>
                </div>
                <div id="table">
                    <table width="100%" border="1" cellPadding="0" cellSpacing="0" style={{borderColor: "#D3E2EC", borderColorDark: "#FFFFFF",  borderTop:"#C2D0DB"+ 2+"px solid", borderLeft:"#ffffff"+ 1+"px solid", borderRight:"#ffffff"+ 1+"px", borderBottom:"#C2D0DB"+ 1+"px solid", borderCollapse: "collapse"}}>
                        <colgroup>
                            <col width="150"/>
                            <col width="?"/>
                        </colgroup>
                        <tbody>
                            <tr  style={{borderBottom: 1+"px solid #C2D0DB"}}>
                                <td className="tbtd_caption"><label htmlFor="id">No</label></td>
                                <td className="tbtd_content">
                                    {idInput}
                                </td>
                            </tr>
                            
                            <tr  style={{borderBottom: 1+"px solid #C2D0DB"}}>
                                <td className="tbtd_caption"><label htmlFor="name">카테고리명</label></td>
                                <td className="tbtd_content">
                                    {typeInput}
                                    &nbsp;
                                </td>
                            </tr>
                            <tr style={{borderBottom: 1+"px solid #C2D0DB"}}>
                                <td className="tbtd_caption"><label htmlFor="useYn">제목</label></td>
                                <td className="tbtd_content">
                                    {subjectInput}
                                </td>
                            </tr>
                            <tr style={{borderBottom: 1+"px solid #C2D0DB"}}>
                                <td className="tbtd_caption"><label htmlFor="description">내용</label></td>
                                <td className="tbtd_content">
                                    {descriptionInput}
                                    &nbsp;
                                </td>
                            </tr>
                            <tr style={{borderBottom: 1+"px solid #C2D0DB"}}>
                                <td className="tbtd_caption"><label htmlFor="regUser">등록자</label></td>
                                <td className="tbtd_content">
                                    {registerInput}
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
                                <button style={{background:"none", color:"black"}} onClick={()=>handleUpdate(params, subject, description)}>수정</button>
                                <img src={btn_r} style={{marginLeft: 6+'px'}} alt=""/>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
