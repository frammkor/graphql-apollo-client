import React from 'react';
import { useHistory } from 'react-router-dom';
import IsAuthentiactedNavBar from './IsAuthentiactedNavBar';
import NotAuthenticatedNavBar from './NotAuthenticatedNavBar';

const Header = ({ session }) => {
  const history = useHistory();
  if (!session && (history.location.pathname !== '/login' && history.location.pathname !== '/')) { history.push('/login'); }
  const navBar = session ? (
    <IsAuthentiactedNavBar session={session} />
  ) : (
    <NotAuthenticatedNavBar />
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
      <div className="container">
        {navBar}
      </div>
    </nav>
  );
};

export default Header;
