import { toast } from "react-toastify";
import api from "../../apiService";
import * as types from "../constants/book.constant";

const bookActions = {};

bookActions.getAllBooks = ({ pageNum, limit, query }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.GET_ALL_BOOKS_REQUEST });

      let url = `/books?_page=${pageNum}&_limit=${limit}`;
      if (query) url += `&q=${query}`;
      const res = await api.get(url);

      dispatch({ type: types.GET_ALL_BOOKS_SUCCESS, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: types.GET_ALL_BOOKS_FAIL, payload: err.message });
    }
  };
};

bookActions.getFavorites = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.GET_FAVORITE_REQUEST });
      let url = `/favorites`;
      const res = await api.get(url);
      dispatch({ type: types.GET_FAVORITE_SUCCESS, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: types.GET_FAVORITE_FAIL, payload: err.message });
    }
  };
};

bookActions.getSingleBook =
  ({ bookId }) =>
  async (dispatch) => {
    dispatch({ type: types.GET_SINGLE_BOOK_REQUEST });
    try {
      let url = `/books/${bookId}`;
      const res = await api.get(url);
      dispatch({ type: types.GET_SINGLE_BOOK_SUCCESS, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: types.GET_SINGLE_BOOK_FAIL });
    }
  };

bookActions.addToFavorite =
  ({ addingBook }) =>
  async (dispatch) => {
    dispatch({ type: types.POST_TO_FAVORITE_REQUEST });
    try {
      let url = `/favorites`;
      const res = await api.post(url, addingBook);
      toast.success("The book has been added to the reading list!");
      dispatch({ type: types.POST_TO_FAVORITE_SUCCESS });
    } catch (err) {
      console.log(err);
      dispatch({ type: types.POST_TO_FAVORITE_FAIL });
    }
  };

bookActions.deleteFavorite =
  ({ removedBookId }) =>
  async (dispatch) => {
    dispatch({ type: types.DELETE_FAVORITE_REQUEST });
    try {
      let url = `/favorites/${removedBookId}`;
      const res = await api.delete(url);
      toast.success("The book has been removed");
      dispatch(bookActions.getFavorites());
      dispatch({ type: types.DELETE_FAVORITE_SUCCESS });
    } catch (err) {
      console.log(err);
      dispatch({ type: types.DELETE_FAVORITE_FAIL });
    }
  };

export default bookActions;
