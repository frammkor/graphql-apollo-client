import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { useHistory } from 'react-router-dom';
import { AUTHENTICATE_USER } from '../../mutations';
import { WarningAlert } from '../../components/Alerts';

export const LoginScreen = ({ refetch }) => {
  const history = useHistory();

  const [warningMessage, setWarningMessage] = useState('');

  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialState = {
    userName: '',
    password: '',
  };
  const [input, setInput] = useState(initialState);

  const updateState = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  React.useEffect(() => {
    if (input.userName && input.password) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    return () => {
    };
  }, [input]);

  const handleSubmit = (e, runMutation) => {
    e.preventDefault();
    setIsLoading(true);
    runMutation()
      .then(async ({ data }) => {
        if (data.authenticateUser.token) {
          localStorage.setItem('token', data.authenticateUser.token);
          await refetch();
          setInput(initialState);
          history.push('/');
        } else {
          setWarningMessage('Invalid Credentials');
          setIsLoading(false);
        }
      });
  };

  return (
    <>
      <h1 className="text-center mb-5">Login</h1>
      <div className="container">

        <div className="row justify-content-center">
          <Mutation
            mutation={AUTHENTICATE_USER}
            variables={{
              input,
            }}
          >
            {(runMutation) => (
              <form
                className="col"
                onSubmit={(e) => handleSubmit(e, runMutation)}
              >
                <div className="form-group">
                  <label>User Name</label>
                  <input
                    value={input.userName}
                    type="text"
                    name="userName"
                    className="form-control"
                    placeholder="User Name"
                    onChange={(e) => updateState(e)}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    value={input.password}
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => updateState(e)}
                  />
                </div>
                {warningMessage ? (<WarningAlert message={warningMessage} />) : ('')}
                <button
                  disabled={!isValid || isLoading}
                  type="submit"
                  className="btn btn-success float-right"
                >
                  Login
                </button>
              </form>
            )}
          </Mutation>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
