
import { subTypes } from "../actions/subActions";

const initialState = {
    subItems: []
};

const subReducer = (state = initialState, action) => {
    switch (action.type) {
        case subTypes.CREATE_SUB_CATEGORY:
            return {
                ...state, subItems: [action.payload, ...state.subItems]
            };
        case subTypes.GET_ALL_SUB_CATEGORY:
            return {
                ...state, subItems: action.payload
            };
        case subTypes.DELETE_SUB_CATEGORY:
            const newSubs = [...state.subItems];

            const idx = newSubs.findIndex((val) => val.slug === action.payload.slug);

            newSubs.splice(idx, 1);

            return {
                ...state, subItems: newSubs
            };
        default:
            return state
    }
};

export default subReducer;