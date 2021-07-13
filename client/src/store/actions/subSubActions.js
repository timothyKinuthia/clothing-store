import { deleteDataApi, getDataApi, patchDataApi, postDataApi } from "../../functions/apis";
import { globalTypes } from "./globalTypes";

export const subSubTypes = {
    CREATE_SUB_SUB_CATEGORY: "CREATE_SUB_SUB_CATEGORY",
    GET_ALL_SUB_SUB_CATEGORY: "GET_ALL_SUB_SUB_CATEGORY",
    UPDATE_SUB_SUB_CATEGORY: "UPDATE_SUB_SUB_CATEGORY",
    DELETE_SUB_SUB_CATEGORY: "DELETE_SUB_SUB_CATEGORY"
};

export const createSubSubCategory = ({ name, subId, token }) => async (dispatch) => {
    
    try {

        const res = await postDataApi("sub-sub-category/create", { name, parent: subId }, token);

        dispatch({ type: subSubTypes.CREATE_SUB_SUB_CATEGORY, payload: res.data.subsub });

     } catch (err) {
        dispatch({ type: globalTypes.ALERT, payload: err.response.data || { msg: "Network error!" } });
    }
}

export const getAllSubSubCategory = () => async (dispatch) => {
    
    try {
        const res = await getDataApi('sub-sub-category/getAll');

        dispatch({ type: subSubTypes.GET_ALL_SUB_SUB_CATEGORY, payload: res.data.subsubs });

    } catch (err) {
        dispatch({ type: globalTypes.ALERT, payload: err.response.data || { msg: "Network error!" } });
    }
};

export const updateSubSubCategory = ({ newSubSub, token }) => async (dispatch) => {

    try {
        await patchDataApi(`sub-sub-category/update/${newSubSub._id}`, { name: newSubSub.name, parent: newSubSub.subId }, token);

        dispatch(getAllSubSubCategory());

    } catch (err) {
        dispatch({ type: globalTypes.ALERT, payload: err.response.data || { msg: "Network error!" } });
    }
};

export const deleteSubSubCategory = ({ item, token }) => async (dispatch) => {

    dispatch({ type: subSubTypes.DELETE_SUB_SUB_CATEGORY, payload: item });

    try {
        await deleteDataApi(`sub-sub-category/delete/${item.slug}`, token);
    } catch (err) {
        dispatch({ type: globalTypes.ALERT, payload: err.response.data || { msg: "Network error!" } });
    }
};