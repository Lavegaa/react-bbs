import Axios from 'axios';

export const api = ({url, type = "get", param}) => {
    return Axios({
        method: type,
        url: `http://localhost:3001${url}`,
        data: param,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Access-Control-Allow-Headers": "Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization"
        }
    })
}