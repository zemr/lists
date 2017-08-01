const SET = 'repository/SET';

export const setRepository = (url, auth, repo) => ({
  type: SET, url, auth, repo
});

const initialState = {
  url: '',
  auth: '',
  repo: ''
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET:
      return {
        url: action.url,
        auth: action.auth,
        repo: action.repo
      };
    default:
      return state;
  }
};

export default reducer
