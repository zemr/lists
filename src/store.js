import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash.throttle';
import { storageAvailable, saveStateData, loadState } from './utils/storage';

import contributorsReducer from './people/contributors-reducer';
import subscribersReducer from './people/subscribers-reducer';

const reducer = combineReducers({
  contributors: contributorsReducer,
  subscribers: subscribersReducer
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

if (storageAvailable()) {
  store.subscribe(throttle(() => {
    saveStateData(
      'state',
      {
        contributors: {
          data: store.getState().contributors.data,
          modified: store.getState().contributors.modified
        },
        subscribers: {
          data: store.getState().subscribers.data,
          modified: store.getState().subscribers.modified
        }
      }
    );
    saveStateData('contributorsDate', store.getState().contributors.modified);
    saveStateData('subscribersDate', store.getState().subscribers.modified);
  }, 1000));
}

export default store
