import { globalTypes } from "../actions/globalTypes";

const initialState = {}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case globalTypes.AUTH:
            return action.payload;
        default:
            return state;
    }
};

export default authReducer;