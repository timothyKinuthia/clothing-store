
import { subSubTypes } from "../actions/subSubActions";

const initialState = {
    subsubItems: []
};

const subReducer = (state = initialState, action) => {
    switch (action.type) {
        case subSubTypes.CREATE_SUB_SUB_CATEGORY:
            return {
                ...state, subsubItems: [action.payload, ...state.subsubItems]
            };
        case subSubTypes.GET_ALL_SUB_SUB_CATEGORY:
            return {
                ...state, subsubItems: action.payload
            };
        case subSubTypes.DELETE_SUB_SUB_CATEGORY:
            const newSubSubs = [...state.subsubItems];

            const idx = newSubSubs.findIndex((val) => val.slug === action.payload.slug);

            newSubSubs.splice(idx, 1);

            return {
                ...state, subsubItems: newSubSubs
            };
        default:
            return state
    }
};

export default subReducer;