import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../Reducers/RootReducer'
import {composeWithDevTools} from 'redux-devtools-extension'

export const Store = (preloadedState) => {
    const middlewares = [];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const storeEnhancers = [middlewareEnhancer];

    const composedEnhancer = composeWithDevTools(...storeEnhancers);

    const store = createStore (
        rootReducer,
        preloadedState,
        composedEnhancer
    );

    if(process.env.NODE_ENV !== 'production') {
        if(module.hot) {
            module.hot.accept('../Reducers/RootReducer.js', () => {
                const newRootReducer = require('../Reducers/RootReducer').default;
                store.replaceReducer(newRootReducer)
            })
        }
    }

    return store;
}