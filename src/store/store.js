import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

const middleware = [];
export const store = createStore(rootReducer, applyMiddleware(...middleware));

