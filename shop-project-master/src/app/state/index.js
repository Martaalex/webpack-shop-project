import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import middlewares from './middleware';

const appliedMiddleware = applyMiddleware(...middlewares);
const finalMiddlewares =
  process.env.NODE_ENV === 'productions'
    ? appliedMiddleware
    : composeWithDevTools(appliedMiddleware);
const store = createStore(reducers, finalMiddlewares);

export default store;
