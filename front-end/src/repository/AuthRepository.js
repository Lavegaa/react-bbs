import { api } from '../context/serviceContext';

export const addUser = async (param) => {
    return await api({
        url: `/adduser`,
        type: "post",
        param
    })
}

export const getUser = async (param) => {
    return await api({
        url: `/getuser`,
        type: "post",
        param
    })
}

export const getAllUser = async (param) => {
    return await api({
        url: `/getalluser`,
        type: "get",
        param
    })
}

export const deleteUser = async (param) => {
    return await api({
        url: `/deleteuser`,
        type: "delete",
        param
    })
}

export const login = async (param) => {
    return await api({
        url: `/login`,
        type: "post",
        param
    })
}
