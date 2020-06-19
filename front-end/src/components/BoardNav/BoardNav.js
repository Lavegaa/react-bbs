import React from 'react'
import { Link } from 'react-router-dom'

export default function BoardNav() {
    return (
        <div>
            <div className="search_box">
                <ul>
                    <li>
                        <span className="btn_b"><Link to="/register" title="등록 버튼">등록</Link></span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
