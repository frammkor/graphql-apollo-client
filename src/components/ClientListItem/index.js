import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { DELETE_CLIENT } from '../../mutations';

const ClientListItem = ({ client, setAlert }) => {
  const {
    clientId, firstName, lastName, company,
  } = client;
  return (
    <li className="list-group-item">
      <div className="d-md-flex justify-content-between align-items-center">
        <p className="col-md-4 d-flex mb-3 mb-md-0">
          {`${firstName} ${lastName}`}
          <b className="ml-2">
            -
            {company}
          </b>
        </p>
        <div className="col-md-8 row d-flex justify-content-end d-in-line-block">
          <Link
            className="btn btn-warning mr-sm-2 col"
            to={`/order/new/${clientId}`}
          >
            <b>&#43;</b>
            {' '}
            New Order
          </Link>
          <Link
            className="btn btn-primary mr-sm-2 col"
            to={`/orders/${clientId}`}
          >
            See Orders
          </Link>
          <Mutation
            mutation={DELETE_CLIENT}
            onCompleted={(data) => { setAlert({ show: true, message: data.deleteClient }); }}
          >
            {(deleteClient) => (
              <button
                onClick={() => {
                  if (window.confirm('Do you want to delete this client?')) {
                    deleteClient({ variables: { clientId } });
                  }
                }}
                type="button"
                className="btn btn-danger mr-sm-2 col"
              >
                <b>&times;</b>
                {' '}
                Delete Client
              </button>
            )}
          </Mutation>
          <Link to={`/client/edit/${clientId}`} className="btn btn-success col">
            Edit Client
          </Link>
        </div>
      </div>
    </li>
  );
};

export default ClientListItem;
