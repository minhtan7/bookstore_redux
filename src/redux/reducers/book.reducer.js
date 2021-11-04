import * as types from "../constants/book.constant";

const initialState = {
  books: [],
  loading: false,
  errorMessage: "",
  singleBook: null,
  favoriteBooks: [],
};

const bookReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ALL_BOOKS_REQUEST:
      return { ...state, loading: true, errorMessage: "" };
    case types.GET_SINGLE_BOOK_REQUEST:
    case types.POST_TO_FAVORITE_REQUEST:
    case types.GET_FAVORITE_REQUEST:
    case types.DELETE_FAVORITE_REQUEST:
      return { ...state, loading: true };
    case types.GET_ALL_BOOKS_SUCCESS:
      return { ...state, books: payload, loading: false };
    case types.GET_FAVORITE_SUCCESS:
      return { ...state, favoriteBooks: payload, loading: false };
    case types.GET_SINGLE_BOOK_SUCCESS:
      return { ...state, singleBook: payload, loading: false };
    case types.GET_ALL_BOOKS_FAIL:
      return { ...state, errorMessage: payload, loading: false };
    case types.POST_TO_FAVORITE_SUCCESS:
    case types.DELETE_FAVORITE_SUCCESS:
    case types.GET_SINGLE_BOOK_FAIL:
    case types.POST_TO_FAVORITE_FAIL:
    case types.GET_FAVORITE_FAIL:
    case types.DELETE_FAVORITE_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default bookReducer;
