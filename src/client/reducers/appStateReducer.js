export const SET_DATA = 'SET_DATA';
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_GLOBAL_MESSAGE = 'SET_GLOBAL_MESSAGE';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_SELECTED_ID = 'SET_SELECTED_ID';
export const SET_HISTORY = 'SET_HISTORY';
export const SHOW_EDITOR = 'SHOW_EDITOR';

export const appInitialState = {
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
