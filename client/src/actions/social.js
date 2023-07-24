import * as api from "../api";
import { useLocalStorage } from "../hook/useLocalStorage";
import { setCurrentUser } from "./currentUser";

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: "SOCIAL_START_LOADING" });
    const { data } = await api.getPosts();
    dispatch({ type: "SET_POSTS", payload: data });
  } catch (error) {
    dispatch({
      type: "SET_ERROR",
      payload: {
        success: false,
        message: "unable to get posts",
        location: window.location.href,
      },
    });
  }
};

export const addPost = (description, url) => async (dispatch) => {
  try {
    dispatch({ type: "SOCIAL_START_LOADING" });
    const { data } = await api.addPost(description, url);
    dispatch({ type: "SET_POSTS", payload: data });
  } catch (error) {
    dispatch({
      type: "SET_ERROR",
      payload: {
        success: false,
        message: "unable to get posts",
        location: window.location.href,
      },
    });
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: "SOCIAL_START_LOADING" });
    const { data } = await api.likePost(id);
    dispatch({ type: "UPDATE_AUTH", data: data.user });
    useLocalStorage(data.user);
    dispatch(setCurrentUser({ result: data.user }));
  } catch (error) {
    console.log(error);
    dispatch({
      type: "SET_ERROR",
      payload: {
        success: false,
        message: "Unable to like this post",
        location: window.location.href,
      },
    });
  }
};

export const unlikePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: "SOCIAL_START_LOADING" });
    const { data } = await api.unlikePost(id);
    dispatch({ type: "UPDATE_AUTH", data: data.user });
    useLocalStorage(data.user);
    dispatch(setCurrentUser({ result: data.user }));
  } catch (error) {
    dispatch({
      type: "SET_ERROR",
      payload: {
        success: false,
        message: "Unable to like this post",
        location: window.location.href,
      },
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: "SOCIAL_START_LOADING" });
    const { data } = await api.deletePost(id);
  } catch (error) {
    dispatch({
      type: "SET_ERROR",
      payload: {
        success: false,
        message: "Unable to like this post",
        location: window.location.href,
      },
    });
  }
};

export const getCurrentUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({ type: "SOCIAL_START_LOADING" });
    const { data } = await api.getUserPosts(id);
    console.log(data, "data in get current userPorst");
    dispatch({ type: "SET_POSTS", payload: data });
  } catch (error) {
    dispatch({
      type: "SET_ERROR",
      payload: {
        success: false,
        message: "Unable to like this post",
        location: window.location.href,
      },
    });
  }
};

export const getPostById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "SOCIAL_START_LOADING" });
    const { data } = await api.getPostById(id);
    console.log(data, "data in get current userPorst");
    dispatch({ type: "SET_POSTS", payload: data });
  } catch (error) {
    dispatch({
      type: "SET_ERROR",
      payload: {
        success: false,
        message: "Unable to like this post",
        location: window.location.href,
      },
    });
  }
};
