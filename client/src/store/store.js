import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';

const StoreProvider = ({ children }) => {
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
};

export default StoreProvider;