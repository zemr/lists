import React from 'react';

export class Wrapper extends React.Component {
  render() {
    return this.props.children;
  }
}

export const store = {
  getState: () => {
    return {
      people: {
        data: {
          id: 7,
          login: 'seven'
        }
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
  people: {
    data: [{ id: 7, login: 'seven' }]
  }
};

export const setupState = "{\"people\":{\"data\":[{\"id\":7,\"login\":\"seven\"}]}}";

// people-reducer
export const prDate = "Sun, 09 Jul 2017 13:20:57 GMT";
export const prUrl = 'https://path';
export const prInitObject = {
  headers: {
    "If-Modified-Since": prDate
  }
};