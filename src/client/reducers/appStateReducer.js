export const initialState = {
  data: [],
  selectedId: null,
  isLoggedIn: false,
  globalMessage: null,
  showEditor: false,
  isLoading: false,
  history: null,
};

const appStateReducer = (state, action) => {
  const actions = {
    SET_DATA: 'data',
    SET_USER_AUTH_STATE: 'isLoggedIn',
    SET_GLOBAL_MESSAGE: 'globalMessage',
    SET_LOADER_STATE: 'isLoading',
    SET_EDITOR_STATE: 'showEditor',
    SET_SELECTED_ID: 'selectedId',
    SET_HISTORY: 'history',
  };

  return action.type
    ? { ...state, [actions[action.type]]: action.payload }
    : state;
};

export default appStateReducer;
