import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash.throttle';
import { storageAvailable, saveStateData, loadState } from './utils/storage';

import contributorsReducer from './people/reducer-contributors';
import subscribersReducer from './people/reducer-subscribers';
import issuesReducer from './issues/reducer-issues';
import repositoryReducer from './home/reducer-repository';

const reducer = combineReducers({
  contributors: contributorsReducer,
  subscribers: subscribersReducer,
  issues: issuesReducer,
  repository: repositoryReducer
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
        },
        issues: {
          data: store.getState().issues.data,
          etag: store.getState().issues.etag,
          error: []
        }
      }
    );
    saveStateData('etagContributors', store.getState().contributors.etag);
    saveStateData('etagSubscribers', store.getState().subscribers.etag);
    saveStateData('etagIssues', store.getState().issues.etag);
  }, 1000));
}

export default store
