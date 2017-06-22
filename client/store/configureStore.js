import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from '../reducers';

const configureStore = initialState => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware, apiMiddleware)
  );
}

export default configureStore;