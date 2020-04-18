import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import ProductDetails from './ProductDetails';
import { UPDATE_ORDER } from '../../mutations';

const OrderListItem = ({ order, refetch }) => {
  const [updatedOrder, setUpdatedOrder] = useState(order);

  const {
    id, status, totalPrice, productsRequested, date,
  } = updatedOrder;

  const displayData = new Date(Number(date)).toLocaleString('es-ES');

  let statusColorClass;
  switch (order.status) {
    case 'PENDING':
      statusColorClass = 'border-light';
      break;
    case 'CANCELED':
      statusColorClass = 'border-danger';
      break;
    case 'COMPLEATED':
      statusColorClass = 'border-success';
      break;
    default:
      break;
  }

  const needToUpdateButton = updatedOrder === order ? (
    <button
      type="button"
      className="btn btn-primary disabled mr-2"
    >
      Order Up to Date
    </button>
  ) : (
      <Mutation
        mutation={UPDATE_ORDER}
        variables={{ input: updatedOrder }}
        onCompleted={(data) => {
          setMutationRes(data.updateOrder);
          refetch();
        }}
      >
        {(runMutation) => (
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={runMutation}
          >
            Update Order
          </button>
        )}
      </Mutation>
    );

  const [mutationRes, setMutationRes] = useState('');
  const updateNotification = mutationRes ? (
    <div className="btn btn-success disabled" role="alert">
      {mutationRes}
      <div className="close ml-2" onClick={() => setMutationRes('')}>
        <span aria-hidden="true">  &times;</span>
      </div>
    </div>
  ) : ('');


  React.useEffect(() => {
    setTimeout(() => {
      setMutationRes('');
    }, 5000);
    return () => { };
  }, [updatedOrder]);

  React.useEffect(() => {
    setUpdatedOrder(order);
    return () => { };
  }, [order]);

  return (
    <div className="col-md-6 col-lg-4">
      <div className={`card mb-3 order-status-border ${statusColorClass}`}>
        <div className="card-body">
          <p className="card-text font-weight-bold ">
            Status:
            <select
              className="form-control my-3"
              defaultValue={status}
              onChange={(e) => setUpdatedOrder({ ...order, status: e.target.value })}
            >
              <option value="PENDING">PENDING</option>
              <option value="COMPLEATED">COMPLEATED</option>
              <option value="CANCELED">CANCELED</option>
            </select>
          </p>
          <p className="card-text font-weight-bold">
            Order ID:
            <span className="font-weight-normal">
              {' '}
              {id}
            </span>
          </p>
          <p className="card-text font-weight-bold">
            Date Issued:
            <span className="font-weight-normal">
              {' '}
              {displayData}
            </span>
          </p>

          <h5 className="card-text mb-3">Products Requested</h5>
          <ul className="">
            {
              productsRequested.map((product) => (
                <ProductDetails
                  amount={product.amount}
                  product={product}
                  key={product.id}
                />
              ))
            }
          </ul>
          <div className={'d-flex align-items-center justify-content-end'}>
            <p className="card-text font-weight-bold">Total:</p>
            <p className="font-weight-normal">
              {' '}
              $
              {totalPrice}
            </p>
          </div>
          {needToUpdateButton}
          {updateNotification}
        </div>
      </div>
    </div>
  );
};

export default OrderListItem;
