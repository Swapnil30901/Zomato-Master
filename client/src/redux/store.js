import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import logger from 'redux-logger';

// redux middlewares
const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
   middlewares.push(logger);
}

const store = createStore(rootReducer, {}, applyMiddleware(...middlewares));

export default store;