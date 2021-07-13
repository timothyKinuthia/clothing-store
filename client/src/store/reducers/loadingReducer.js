import { globalTypes } from "../actions/globalTypes";

const initialState = false;

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case globalTypes.LOADING:
            return action.payload;
        default:
            return state;
    }
}

export default loadingReducer;