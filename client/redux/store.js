import { compose, createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk';

const enhancers = compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
  );

export default function configureStore(initalState = { users: {} }) {
  return createStore(reducer, initalState, enhancers);
}
