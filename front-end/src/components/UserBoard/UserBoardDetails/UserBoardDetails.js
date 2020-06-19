import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom';
import { getOneBoard, deleteBoard } from '../../../repository/BoardRepository';
import { getUser } from '../../../repository/AuthRepository';
import btn_r from '../../../assets/images/btn_bg_r.gif';
import title_dot from '../../../assets/images/title_dot.gif';

export default function UserBoardDetails() {
    const params = useParams();
    const [detail, setDetail] = useState([]);
    const [me, setMe] = useState([]);
    const [move,setMove] = useState(false);
    const [iam, setIam] = useState(false);
    const compare = (me,detail) => {
        if(me.length&&detail.length) {
            if(me[0]?.uid===detail[0]?.ub_host || me[0]?.isAdmin===true) {
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
                    setDetail(data);
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
    },[params,setMe,setDetail])

    useEffect(()=>{
        compare(me,detail);
    },[me,detail])

    const handleDelete = async () => {
        await deleteBoard({id: params.id});
        setMove(true);
    }

    return (
        <div className="content_pop">
                {move&&<Redirect to="/userboard"/>}
                <div id="title">
                    <ul>
                        <li><img src={title_dot} alt=""/>
                            상세 게시물
                        </li>
                    </ul>
                </div>
                <div id="table">
                    <table width="100%" border="1" cellPadding="0" cellSpacing="0" style={{borderColor: "#D3E2EC", borderColorDark: "#FFFFFF",  borderTop:"#C2D0DB"+ 1+"px solid", borderLeft:"#ffffff"+ 1+"px solid", borderRight:"#ffffff"+ 1+"px", borderBottom:"#C2D0DB"+ 1+"px solid", borderCollapse: "collapse"}}>
                        <colgroup>
                            <col width="150"/>
                            <col width="?"/>
                        </colgroup>
                        <tbody>
                            <tr  style={{borderBottom: 1+"px solid #C2D0DB"}}>
                                <td className="tbtd_caption"><label htmlFor="id">No</label></td>
                                <td className="tbtd_content">
                                    {detail[0]?.ub_id}
                                </td>
                            </tr>
                            
                            <tr  style={{borderBottom: 1+"px solid #C2D0DB"}}>
                                <td className="tbtd_caption"><label htmlFor="name">카테고리</label></td>
                                <td className="tbtd_content">
                                    {detail[0]?.ub_type}
                                    &nbsp;
                                </td>
                            </tr>
                            <tr  style={{borderBottom: 1+"px solid #C2D0DB"}}>
                                <td className="tbtd_caption"><label htmlFor="useYn">제목</label></td>
                                <td className="tbtd_content">
                                    {detail[0]?.ub_subject}
                                </td>
                            </tr>
                            <tr  style={{borderBottom: 1+"px solid #C2D0DB"}}>
                                <td className="tbtd_caption"><label htmlFor="description">내용</label></td>
                                <td className="tbtd_content" style={{height:150+"px"}}>
                                     {detail[0]?.ub_description}
                                    &nbsp;
                                </td>
                            </tr>
                            <tr>
                                <td className="tbtd_caption"><label htmlFor="regUser">등록자</label></td>
                                <td className="tbtd_content">
                                    {detail[0]?.ub_host}
                                    &nbsp;
                                </td>
                            </tr>
                        </tbody>
                        
                    </table>
                </div>
                <div id="sysbtn">
                    <ul>
                        {iam&&(
                            <>
                                <li>
                                <span className="btn_blue_l">
                                    <Link to={`/postUpdate/${params.id}`} style={{background:"none", color:"black", fontWeight: 700}} >수정</Link>
                                    <img src={btn_r} style={{marginLeft: 6+'px'}} alt=""/>
                                </span>
                                </li>
                                <li>
                                    <span className="btn_blue_l">
                                        <button onClick={handleDelete} style={{background:"none", color:"black"}} >삭제</button>
                                        <img src={btn_r} style={{marginLeft: 6+'px'}} alt=""/>
                                    </span>
                                </li>
                            </>
                        )}
                        
                        <li>
                            <span className="btn_blue_l">
                                <Link to="/userboard" style={{background:"none", color:"black", fontWeight: 700}} >목록</Link>
                                <img src={btn_r} style={{marginLeft: 6+'px'}} alt=""/>
                            </span>
                        </li>
                        
                    </ul>
                </div>
            </div>
    )
}
