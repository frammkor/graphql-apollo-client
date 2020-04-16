import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo'
import { DELETE_CLIENT } from '../../mutations'

const ClientListItem = ({ client, setAlert }) => {
  const { clientId, firstName, lastName, company } = client;
  return (
    <li className='list-group-item'>
      <div className='d-md-flex justify-content-between align-items-center'>
        <p className='col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0'>
          {firstName} {lastName} <b> {' - ' + company}</b>
        </p>
        <div className='col-md-8 d-flex justify-content-end d-in-line-block'>
          <Link
            className='btn btn-warning mr-2'
            to={`/order/new/${clientId}`} >
            <b>&#43;</b> New Order
          </Link>
          <Link
            className='btn btn-primary mr-2'
            to={`/orders/${clientId}`} >
            See Orders
          </Link>
          <Mutation
            mutation={DELETE_CLIENT}
            onCompleted={(data) => { setAlert({ show: true, message: data.deleteClient, }) }}
          >
            {deleteClient => (
              <button
                onClick={() => {
                  if (window.confirm('Do you want to delete this client?')) {
                    deleteClient({ variables: { clientId } })
                  }
                }
                }
                type="button"
                className="btn btn-danger mr-2">
                <b>&times;</b> Delete Client
              </button>
            )}
          </Mutation>
          <Link to={`/client/edit/${clientId}`} className='btn btn-success'>
            Edit Client
          </Link>
        </div>
      </div>
    </li>
  );
}

export default ClientListItem;