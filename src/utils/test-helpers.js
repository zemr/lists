import React from 'react';

export class Wrapper extends React.Component {
  render() {
    return this.props.children;
  }
}

export const store = {
  getState: () => {
    return {
      contributors: {
        data: [[{
          id: 7,
          login: 'seven'
        }]]
      },
      subscribers: {
        data: [[{
          id: 8,
          login: 'eight'
        }]]
      }
    }
  },
  dispatch: () => {},
  subscribe: () => {}
};

export const peopleData = [[
  {"id": 7, "login": "seven"},
  {"id": 8, "login": "eight"},
  {"id": 9, "login": "nine"}
]];

export const storageData = {
  contributors: {
    data: [[{ id: 7, login: 'seven' }]],
    etag: [],
    error: []
  }
};

export const setupState = "{\"contributors\":{\"data\":[[{\"id\":7,\"login\":\"seven\"}]],\"etag\":[],\"error\":[]}}";

// reducers
export const rETag = 'W/"c63d6c91d1d9493ec20dd90792cb8772"';
export const rUrl = 'https://path/name';
export const rInitObject = {
  headers: {
    "If-None-Match": rETag
  }
};
export const rActionTypes = {
  BEGIN: 'test/FETCH_BEGIN',
  SUCCESS: 'test/FETCH_SUCCESS',
  FAIL: 'test/FETCH_FAIL',
  CLEAR: 'test/CLEAR_STATE'
};
