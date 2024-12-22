import { FETCH_DATA, SET_WORD_DATA, SET_LOADING, THEME_COLOR } from "./constants";


export const fetchData = (page: number) => ({
  type: FETCH_DATA,
  page,
});


export const setThemeColor = (color: string) => ({
  type: THEME_COLOR,
  payload: color,
});


export const setWordData = (data: any) => ({
  type: SET_WORD_DATA,
  payload: data, 
});


export const setLoading = (isLoading: boolean) => ({
  type: SET_LOADING,
  payload: isLoading,
});
