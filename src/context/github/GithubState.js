import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

// We do not want to use global variables from .env.local file in production/deployment
// First we declare variables in file where we use them
let githubClientId;
let githubClientSecret;
// Then we check the environment to see if it's in the production or not
// Not in production
if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}
// If we are in productio we use a normaln global variable, not REACT_APP_ part
else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

function GithubState(props) {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Github users
  async function searchUsers(text) {
    setLoading();

    const base = 'https://api.github.com/search/users?';
    const query = `q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`;

    const res = await axios.get(base + query);

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  }

  // Get single Github user
  async function getUser(username) {
    setLoading();

    const base = 'https://api.github.com/users/';
    const query = `${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`;

    const res = await axios.get(base + query);

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  }

  // Get user repos
  async function getUserRepos(username) {
    setLoading();

    const base = 'https://api.github.com/users/';
    const query = `${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`;

    const res = await axios.get(base + query);

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  }

  // Clear users from state
  function clearUsers() {
    dispatch({ type: CLEAR_USERS });
  }

  // Set Loading
  function setLoading() {
    dispatch({ type: SET_LOADING });
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
}

export default GithubState;
