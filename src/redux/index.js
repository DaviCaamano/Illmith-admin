import user from './users';

const redux = require('redux');
const { combineReducers, createStore } = redux;

const rootReducer = combineReducers({
    user
});

const store = createStore(rootReducer);

// store.subscribe(() => console.log('Redux Change: ', store.getState()));

export default store;
