const SET = 'repository/SET';

export const setRepository = (url, auth) => ({
  type: SET, url, auth
});

const initialState = {
  url: '',
  auth: ''
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET:
      return {
        url: action.url,
        auth: action.auth
      };
    default:
      return state;
  }
};

export default reducer
