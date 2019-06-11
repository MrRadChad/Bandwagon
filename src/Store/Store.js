import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../Reducers/RootReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import firebase from '../Config/Firebase';
import {getFirebase, reactReduxFirebase} from 'react-redux-firebase';
import {reduxFirestore, getFirestore} from 'redux-firestore';

const reactReduxFirebaseConfig = {
    userProfile: 'users',
    attachAuthIsReady: true,
    useFirestoreForProfile: true,
    updateProfileOnLogin: false
}


export const Store = (preloadedState) => {
    const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const storeEnhancers = [middlewareEnhancer];

    const composedEnhancer = composeWithDevTools(
        reactReduxFirebase(firebase, reactReduxFirebaseConfig),
        reduxFirestore(firebase),
        ...storeEnhancers
        );

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
