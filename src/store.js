import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash.throttle';
import { saveStateData, loadState } from './utils/storage';

import peopleReducer from './people/people-reducer';

const reducer = combineReducers({
  people: peopleReducer
});

const persistedState = loadState();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  persistedState,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

store.subscribe(throttle(() => {
  saveStateData(
    'state',
    {
      people: {
        data: store.getState().people.data,
        modified: store.getState().people.modified
      }
    }
  );
  saveStateData('date', store.getState().people.modified);
}, 1000));

export default store
