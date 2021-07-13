import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import categoryReducer from './categoryReducer';
import subReducer from './subReducer';
import subSubReducer from './subSubReducer';


const rootReducer = combineReducers({
    alert: alertReducer,
    loading: loadingReducer,
    auth: authReducer,
    categories: categoryReducer,
    subCategories: subReducer,
    subSubs: subSubReducer
});

export default rootReducer;