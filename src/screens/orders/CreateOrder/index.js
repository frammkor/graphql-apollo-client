import React from 'react';
import { Query } from 'react-apollo';
import { ClientData, Spiner, ProductSelection } from '../../../components';
import { GET_PRODUCTS } from '../../../queries';

export default ({ session }) => (
  <>
    <h2 className="text-center mb-5">Create Order </h2>
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <ClientData />
        </div>
        <div className="col-md-9">
          <Query query={GET_PRODUCTS} variables={{ byStock: true }}>
            {({ loading, error, data }) => {
              if (loading) return <Spiner />;
              if (error) return `Error! ${error.message}`;

              return (
                <ProductSelection
                  session={session}
                  products={data.getProducts}
                />
              );
            }}
          </Query>
        </div>
      </div>
    </div>
  </>
);
