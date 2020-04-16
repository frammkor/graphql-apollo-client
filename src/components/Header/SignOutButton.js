import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { useHistory } from 'react-router-dom';

const SignOutButton = () => {
  const history = useHistory();
  const handleClick = (client) => {
    localStorage.removeItem('token', '');
    client.resetStore();
    history.push('/login');
  };
  return (
    <ApolloConsumer>
      {(client) => (
        <button
          onClick={() => handleClick(client)}
          className="nav-link btn btn-block btn-danger"
        >
          SignOut
        </button>
      )}
    </ApolloConsumer>

  );
};

export default SignOutButton;
