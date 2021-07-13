import axios from 'axios';

export const postDataApi = async (url, body, authToken) => {
    return await axios.post(`/api/${url}`, body, {
        headers: {
            Authorization: authToken
        }
    })
};

export const getDataApi = async (url, authToken) => {
    return await axios.get(`/api/${url}`, {
        headers: {
            Authorization: authToken
        }
    })
}

export const patchDataApi = async (url, body, authToken) => {
    return await axios.patch(`/api/${url}`, body, {
        headers: {
            Authorization: authToken
        }
    });
};

export const deleteDataApi = async (url, authToken) => {
    return await axios.delete(`/api/${url}`, {
        headers: {
            Authorization: authToken
        }
    })
}