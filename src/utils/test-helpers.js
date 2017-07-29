import React from 'react';

export const store = {
  getState: () => {
    return {
      contributors: {
        data: [[{
          id: 7,
          login: 'seven'
        }]],
        etag: ['a']
      },
      subscribers: {
        data: [[{
          id: 8,
          login: 'eight'
        }]],
        etag: ['b']
      },
      issues: {
        data: [[{
          number: 9,
          title: 'nine',
          body: 'nine',
          created_at: '2017-06-20T12:17:08Z',
          user: {
            login: 'nine'
          }
        }]],
        etag: ['c']
      },
      repository: {
        url: '',
        auth: ''
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
const rAuth = 'abc';
export const rInitObjectAuth = {
  headers: {
    "Authorization": "Basic " + rAuth
  }
};
export const rInitObjectAuthE = {
  headers: {
    "If-None-Match": rETag,
    "Authorization": "Basic " + rAuth
  }
};
export const rActionTypes = {
  BEGIN: 'test/FETCH_BEGIN',
  SUCCESS: 'test/FETCH_SUCCESS',
  FAIL: 'test/FETCH_FAIL',
  CLEAR: 'test/CLEAR_STATE',
  TRIM: 'test/TRIM_ETAGS'
};
export let rDisplayArgs = (args) => args;
export const rStore = {
  name: {
    data: [],
    etag: []
  },
  repository: {
    auth: ''
  }
};
export const rStoreETags = {
  name: {
    data: [[], [], [], []],
    etag: ['a', 'b', 'c', 'd']
  },
  repository: {
    auth: ''
  }
};
export const rStorePage = {
  name: {
    data: [[]],
    etag: ['a', 'b']
  },
  repository: {
    auth: ''
  }
};
export const rStorePages = {
  name: {
    data: [[], [], []],
    etag: []
  },
  repository: {
    auth: ''
  }
};
export const rStoreAuth = {
  name: {
    data: [],
    etag: []
  },
  repository: {
    auth: rAuth
  }
};
export const rETagArray = ['a', 'b', 'c', 'd'];


//pagination
export const Child = () => (<div>child</div>);
export const paginationData = {
  data: [[
    { "id": 7, "login": "seven" },
    { "id": 8, "login": "eight" },
    { "id": 9, "login": "nine" }
  ]],
  etag: []
};

//issues
export const issuesData = [
  {"number": 7, "title": "seven"},
  {"number": 8, "title": "eight"},
  {"number": 9, "title": "nine"}
];

//issue
export const issueDetails = {
  title: 'issue title',
  body: 'issue body',
  created_at: '2017-06-20T12:17:08Z',
  user: { login: 'author'}
};
