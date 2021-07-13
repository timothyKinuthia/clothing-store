import { deleteDataApi, getDataApi, patchDataApi, postDataApi } from "../../functions/apis";
import { globalTypes } from "./globalTypes";

export const subTypes = {
    CREATE_SUB_CATEGORY: "CREATE_SUB_CATEGORY",
    GET_ALL_SUB_CATEGORY: "GET_ALL_SUB_CATEGORY",
    UPDATE_SUB_CATEGORY: "UPDATE_SUB_CATEGORY",
    DELETE_SUB_CATEGORY: "DELETE_SUB_CATEGORY"
};

export const createSubCategory = ({ name, catId, token }) => async (dispatch) => {
    
    try {

        const res = await postDataApi("sub-category/create", { name, parent: catId }, token);

        dispatch({ type: subTypes.CREATE_SUB_CATEGORY, payload: res.data.sub });

     } catch (err) {
        dispatch({ type: globalTypes.ALERT, payload: err.response.data || { msg: "Network error!" } });
    }
}

export const getAllSubCategory = () => async (dispatch) => {
    
    try {
        const res = await getDataApi('sub-category/getAll');

        dispatch({ type: subTypes.GET_ALL_SUB_CATEGORY, payload: res.data.subs });

    } catch (err) {
        dispatch({ type: globalTypes.ALERT, payload: err.response.data || { msg: "Network error!" } });
    }
};

export const updateSubCategory = ({ newSub, token }) => async (dispatch) => {


    try {
        await patchDataApi(`sub-category/update/${newSub._id}`, { name: newSub.name, parent: newSub.catId }, token);

        dispatch(getAllSubCategory());

    } catch (err) {
        dispatch({ type: globalTypes.ALERT, payload: err.response.data || { msg: "Network error!" } });
    }
};

export const deleteSubCategory = ({ item, token }) => async (dispatch) => {

    dispatch({ type: subTypes.DELETE_SUB_CATEGORY, payload: item });

    try {
        await deleteDataApi(`sub-category/delete/${item.slug}`, token);
    } catch (err) {
        dispatch({ type: globalTypes.ALERT, payload: err.response.data || { msg: "Network error!" } });
    }
};