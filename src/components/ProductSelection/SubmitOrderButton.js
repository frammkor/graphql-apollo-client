import React from 'react'

import { CREATE_ORDER } from '../../mutations';

import { Mutation } from 'react-apollo';
import { useParams, useHistory } from 'react-router-dom';

const SubmitOrderButton = ({ totalPrice, productsToOrder }) => {
  const history = useHistory();
  const { id: clientId } = useParams();
  return (
    <Mutation
      mutation={CREATE_ORDER}
      onCompleted={() => history.push('/clients')}
    >
      {runMutation => (
        <button
          type="button"
          className='btn btn-warning mt-4'
          disabled={totalPrice === 0}
          onClick={() => {
            const productsRequested = productsToOrder.map(({ name, price, stock, ...product }) => product)
            const orderInput = {
              productsRequested,
              totalPrice,
              clientId,
            }
            runMutation({ variables: { input: orderInput } });
          }}
        >
          Submit Order
        </button>
      )}
    </Mutation >

  )
}

export default SubmitOrderButton;