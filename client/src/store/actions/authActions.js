import { postDataApi } from "../../functions/apis"
import { globalTypes } from "./globalTypes"


export const registerUser = ({ userInfo }) => async (dispatch) => {
    try {
        const res = await postDataApi('register', userInfo);
        dispatch({ type: globalTypes.AUTH, payload: res.data });
    } catch (err) {
        return dispatch({ type: globalTypes.ALERT, payload: err.response.data || { msg: "Network error!" } });
    }
};

export const loginUser = ({ userInfo }) => async (dispatch) => {
    try {
        const res = await postDataApi('login', userInfo);

        localStorage.setItem("firstLogin", JSON.stringify(res.data.token));

        dispatch({ type: globalTypes.AUTH, payload: res.data });
    } catch (err) {
        return dispatch({ type: globalTypes.ALERT, payload: err.response.data || { msg: "Network error!" } });
    }
}

export const genAccessToken = () => async (dispatch) => {
    try {

        if (localStorage.getItem("firstLogin")) {
            const res = await postDataApi('refresh_token');
            
            dispatch({ type: globalTypes.AUTH, payload: res.data });
        }

    } catch (err) {
        return dispatch({ type: globalTypes.ALERT, payload: err.response.data || { msg: "Network error!" } });
    }
};

export const logout = () => async (dispatch) => {
    
    try {

        await postDataApi('logout');
        localStorage.removeItem("firstLogin");
        dispatch({ type: globalTypes.AUTH, payload: {} });
        
     } catch (err) {
        return dispatch({ type: globalTypes.ALERT, payload: err.response.data || { msg: "Network error!" } });
    }
}