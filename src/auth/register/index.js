import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { useHistory } from 'react-router-dom';
import { CREATE_USER } from '../../mutations';
import { WarningAlert, SuccessAlert } from '../../components/Alerts';

export const RegisterScreen = () => {
  const history = useHistory();

  const mutationResponseInitialState = {
    message: '',
    status: '',
  };
  const [mutationResponse, setMutationResponse] = useState(mutationResponseInitialState);
  const MutationResponseDisplay = () => {
    if (mutationResponse.status === 'ERROR') return <WarningAlert message={mutationResponse.message} />;
    if (mutationResponse.status === 'SUCCESS') return <SuccessAlert message={mutationResponse.message} />;
    return '';
  };

  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialState = {
    userName: '',
    password: '',
    confirmPassword: '',
    role: '',
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
    if (input.userName && input.role && input.password && input.password === input.confirmPassword) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    return () => {
    };
  }, [input]);

  const handleSubmit = (e, runMutation) => {
    delete input.confirmPassword;
    setIsLoading(true);
    e.preventDefault();
    runMutation()
      .then(({ data }) => {
        if (data.createUser.status === 'ERROR') {
          setMutationResponse(data.createUser);
        } else if (data.createUser.status === 'SUCCESS') {
          setMutationResponse(data.createUser);
          setInput(initialState);
          setTimeout(() => {
            history.push('/login');
          }, 6000);
        }
      });
    setIsLoading(false);
  };

  return (
    <>
      <h1 className="text-center mb-5">New User</h1>
      <div className="container">
        <div className="row justify-content-md-center">
          <Mutation
            mutation={CREATE_USER}
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
                  <label>User Role</label>
                  <select
                    value={input.role}
                    type="text"
                    name="role"
                    className="form-control"
                    placeholder="User Role"
                    onChange={(e) => updateState(e)}
                  >
                    <option value="">Choose</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="SELLER">SELLER</option>
                  </select>
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
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    value={input.confirmPassword}
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    onChange={(e) => updateState(e)}
                  />
                </div>
                <MutationResponseDisplay />
                <button
                  disabled={!isValid || isLoading}
                  type="submit"
                  className="btn btn-success float-right"
                >
                  Create User
                </button>
              </form>
            )}
          </Mutation>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
