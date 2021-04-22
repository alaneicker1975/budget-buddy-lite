export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_GLOBAL_MESSAGE = 'SET_GLOBAL_MESSAGE';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_HISTORY = 'SET_HISTORY';
export const SET_SHOW_EDITOR = 'SET_SHOW_EDITOR';
export const SET_DATA = 'SET_DATA';
export const SET_SELECTED_EXPENSE = 'SET_SELECTED_EXPENSE';

export const appInitialState = {
  data: [],
  selectedExpense: {},
  isLoggedIn: false,
  isLoading: false,
  globalMessage: null,
  showEditor: false,
  history: null,
};

const appReducer = (state, action) => {
  const actions = {
    SET_DATA: 'data',
    SET_SELECTED_EXPENSE: 'selectedExpense',
    SET_IS_LOGGED_IN: 'isLoggedIn',
    SET_GLOBAL_MESSAGE: 'globalMessage',
    SET_IS_LOADING: 'isLoading',
    SET_HISTORY: 'history',
    SET_SHOW_EDITOR: 'showEditor',
  };

  return action.type
    ? { ...state, [actions[action.type]]: action.payload }
    : state;
};

export default appReducer;
