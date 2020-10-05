import React from 'react';
import Search from '../users/Search';
import Users from '../users/Users';

function Home() {
  return (
    <React.Fragment>
      <Search />
      <Users />
    </React.Fragment>
  );
}

export default Home;
