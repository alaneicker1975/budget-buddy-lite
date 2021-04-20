export const initialState = {
  data: [],
  selectedId: null,
  isLoggedIn: false,
  isLoading: false,
  globalMessage: null,
  showEditor: false,
  history: null,
};

const appStateReducer = (state, action) => {
  const actions = {
    SET_DATA: 'data',
    SET_IS_LOGGED_IN: 'isLoggedIn',
    SET_GLOBAL_MESSAGE: 'globalMessage',
    SET_IS_LOADING: 'isLoading',
    SET_SELECTED_ID: 'selectedId',
    SET_HISTORY: 'history',
    SHOW_EDITOR: 'showEditor',
  };

  return action.type
    ? { ...state, [actions[action.type]]: action.payload }
    : state;
};

export default appStateReducer;
