// We could stick Repos to the User component but with React and any other component based framework we want to break everything up
import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

// repos is destructured in the function's parameter
function Repos({ repos }) {
  return repos.map(repo => <RepoItem repo={repo} key={repo.id} />);
}

Repos.propTypes = {
  repos: PropTypes.array.isRequired
};

export default Repos;
