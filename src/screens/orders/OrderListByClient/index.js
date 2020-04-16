import React from 'react';
import { useParams } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_ORDER_BY_CLIENT_ID } from '../../../queries';
import { Spiner, OrderListItem } from '../../../components';

const OrderListByClient = ({ session }) => {
  const { clientId } = useParams();
  React.useEffect(() => () => {
  }, []);
  return (
    <>
      <h2 className="text-center mb-5">Orders for </h2>
      <div className="row mr-4 ml-4">
        <Query
          query={GET_ORDER_BY_CLIENT_ID}
          variables={{ clientId }}
          pollInterval={1000}
        >
          {({
            loading, error, data, refetch, startPolling, stopPolling,
          }) => {
            if (loading) return <Spiner />;
            if (error) return `Error: ${error}`;
            return (
              data.getOrdersByClientId.map((order) => (
                <OrderListItem
                  refetch={refetch}
                  key={order.id}
                  order={order}
                />
              ))
            );
          }}
        </Query>
      </div>
    </>
  );
};

export default OrderListByClient;
