import { api } from '../context/serviceContext';

export const getPostList = async (param) => {
    return await api({
        url: `/board`,
        type: "post",
        param
    })
}

export const getOnePost = async (param) => {
    return await api({
        url: `/board/${param.id}`,
        type: "get",
        param
    })
}

export const makePost = async (param) => {
    return await api({
        url: `/boardpost`,
        type: "post",
        param
    })
}

export const updatePost = async (param) => {
    return await api({
        url: `/board/${param.id}`,
        type: "put",
        param
    })
}

export const deletePost = async (param) => {
    return await api({
        url: `/board/${param.id}`,
        type: "delete",
        param
    })
}
