import { api } from '../context/serviceContext';

export const getBoardList = async (param) => {
    return await api({
        url: `/userpost/${param.type}`,
        type: "post",
        param
    })
}

export const getOneBoard = async (param) => {
    return await api({
        url: `/userpostdetail/${param.id}`,
        type: "get",
        param
    })
}

export const makeBoard = async (param) => {
    return await api({
        url: `/userpost`,
        type: "post",
        param
    })
}

export const deleteBoard = async (param) => {
    return await api({
        url: `/userpost/${param.id}`,
        type: "delete",
        param
    })
}

export const updateBoard = async (param) => {
    return await api({
        url: `/userpost/${param.id}`,
        type: "put",
        param
    })
}
