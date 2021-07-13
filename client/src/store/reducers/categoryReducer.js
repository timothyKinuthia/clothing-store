import { categoryTypes } from "../actions/categoryActions";

const initialState = {
    catItems: []
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case categoryTypes.CREATE_CATEGORY:
            return {
                ...state, catItems: [action.payload, ...state.catItems]
            };
        case categoryTypes.GET_ALL_CATEGORY:
            return {
                ...state, catItems: action.payload
            }
        case categoryTypes.DELETE_CATEGORY:
            const newCat = [...state.catItems];

            const idx = newCat.findIndex((val) => val.slug === action.payload.slug);

            newCat.splice(idx, 1);

            return {
                ...state, catItems: newCat
            };
        default:
            return state
    }
};

export default categoryReducer;