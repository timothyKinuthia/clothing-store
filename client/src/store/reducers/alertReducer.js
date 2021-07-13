import { globalTypes } from "../actions/globalTypes";

const initialState = {};

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case globalTypes.ALERT:
            return action.payload;
        default:
            return state;
    }
}

export default alertReducer;