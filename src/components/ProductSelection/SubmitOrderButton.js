import React from 'react';


import { Mutation } from 'react-apollo';
import { useParams, useHistory } from 'react-router-dom';
import { CREATE_ORDER } from '../../mutations';

const SubmitOrderButton = ({ totalPrice, productsToOrder, session }) => {
  const history = useHistory();
  const { clientId } = useParams();
  return (
    <Mutation
      mutation={CREATE_ORDER}
      onCompleted={() => history.push('/clients')}
    >
      {(runMutation) => (
        <button
          type="button"
          className="btn btn-warning mt-4"
          disabled={totalPrice === 0}
          onClick={() => {
            const productsRequested = productsToOrder.map(({
              name, price, stock, ...product
            }) => product);
            const orderInput = {
              productsRequested,
              totalPrice,
              clientId,
              userId: session._id,
            };
            runMutation({ variables: { input: orderInput } });
          }}
        >
          Submit Order
        </button>
      )}
    </Mutation>

  );
};

export default SubmitOrderButton;
