import { SET_WORD_DATA, SET_LOADING, THEME_COLOR } from './constants';

const initialState = {
  worddata: [],
  isLoading: false,
  themeColor: 'dark',  
};

export const worddata = (state = initialState.worddata, action: any) => {
  switch (action.type) {
    case SET_WORD_DATA:
      if (Array.isArray(action.payload)) {
        return [...state, ...action.payload];  
      } else {
        // console.error("error")
      }
    default:
      return state;
  }
};

export const loading = (state = initialState.isLoading, action: any) => {
  switch (action.type) {
    case SET_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export const themeColor = (state = initialState.themeColor, action: any) => {
  switch (action.type) {
    case THEME_COLOR:
      return action.payload;
    default:
      return state;
  }
};
