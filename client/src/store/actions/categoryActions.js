import { deleteDataApi, getDataApi, patchDataApi, postDataApi } from "../../functions/apis";
import { globalTypes } from "./globalTypes";

export const categoryTypes = {
    CREATE_CATEGORY: "CREATE_CATEGORY",
    GET_ALL_CATEGORY: "GET_ALL_CATEGORY",
    UPDATE_CATEGORY: "UPDATE_CATEGORY",
    DELETE_CATEGORY: "DELETE_CATEGORY"
}

export const createCategory = ({ name, token }) => async (dispatch) => {
    
    try {

        const res = await postDataApi("category/create", { name }, token);

        dispatch({ type: categoryTypes.CREATE_CATEGORY, payload: res.data.category });

     } catch (err) {
        dispatch({ type: globalTypes.ALERT, payload: err.response.data || { msg: "Network error!" } });
    }
}

export const getAllCategories = () => async (dispatch) => {
    
    try {
        const res = await getDataApi('category/getAll');

        dispatch({ type: categoryTypes.GET_ALL_CATEGORY, payload: res.data.categories });

    } catch (err) {
        dispatch({ type: globalTypes.ALERT, payload: err.response.data || { msg: "Network error!" } });
    }
};

export const updateCategory = ({ newCat, token }) => async (dispatch) => {

    try {
        await patchDataApi(`/category/update/${newCat._id}`, { name: newCat.name }, token);
        
        dispatch(getAllCategories());

    } catch (err) {
        dispatch({ type: globalTypes.ALERT, payload: err.response.data || { msg: "Network error!" } });
    }
};

export const deleteCategory = ({ item, token }) => async (dispatch) => {

    dispatch({ type: categoryTypes.DELETE_CATEGORY, payload: item });

    try {
        await deleteDataApi(`category/delete/${item.slug}`, token);
    } catch (err) {
        dispatch({ type: globalTypes.ALERT, payload: err.response.data || { msg: "Network error!" } });
    }
}