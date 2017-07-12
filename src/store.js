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
          etag: store.getState().contributors.etag,
          error: []
        },
        subscribers: {
          data: store.getState().subscribers.data,
          etag: store.getState().subscribers.etag,
          error: []
        }
      }
    );
    saveStateData('etagContributors', store.getState().contributors.etag);
    saveStateData('etagSubscribers', store.getState().subscribers.etag);
  }, 1000));
}

export default store
