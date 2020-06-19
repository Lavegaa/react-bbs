import React, { useState } from 'react';

export default function useInput({type, row, cols, size, maxLength, style, readonly}) {
    const [value,setValue] = useState("");
    const input = type==="textarea"?<textarea value={value} className={style&&style} onChange={e => setValue(e.target.value)} rows={row&&row} cols={cols&&cols}></textarea>
                                    :<input type={type} value={value} className={style&&style} onChange={e => setValue(e.target.value)} type={type} size={size&&size} maxLength={maxLength&&maxLength} readOnly={readonly}/> 
    return [value, input , setValue];
}