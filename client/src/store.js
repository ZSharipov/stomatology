import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import tunkMiddleware from 'redux-thunk'
import { loadState, saveState } from './sessionStorage';

// const store = createStore(reducer, applyMiddleware(tunkMiddleware));

const persistedState = loadState();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancer(applyMiddleware(tunkMiddleware));
const store = createStore(reducer, persistedState, middleware);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;



//for preloadBrowser
// import { loadState, saveState } from './sessionStorage';


// const persistedState = loadState();

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const middleware = composeEnhancer(applyMiddleware(tunkMiddleware));
// const store = createStore(reducer, persistedState, middleware);

// store.subscribe(() => {
//     saveState(store.getState());
//   });