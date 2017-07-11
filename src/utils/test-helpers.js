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
        data: [{
          id: 7,
          login: 'seven'
        }]
      },
      subscribers: {
        data: [{
          id: 8,
          login: 'eight'
        }]
      }
    }
  },
  dispatch: () => {},
  subscribe: () => {}
};

export const peopleData = [
  {"id": 7, "login": "seven"},
  {"id": 8, "login": "eight"},
  {"id": 9, "login": "nine"}
];

export const storageData = {
  contributors: {
    data: [{ id: 7, login: 'seven' }]
  }
};

export const setupState = "{\"contributors\":{\"data\":[{\"id\":7,\"login\":\"seven\"}]}}";

// reducers
export const rDate = "Sun, 09 Jul 2017 13:20:57 GMT";
export const rUrl = 'https://path';
export const rInitObject = {
  headers: {
    "If-Modified-Since": rDate
  }
};
export const rActionTypes = {
  BEGIN: 'test/FETCH_BEGIN',
  SUCCESS: 'test/FETCH_SUCCESS',
  FAIL: 'test/FETCH_FAIL',
  CLEAR: 'test/CLEAR_STATE'
};
