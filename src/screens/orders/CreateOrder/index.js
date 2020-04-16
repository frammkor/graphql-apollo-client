import React from 'react';
import { useParams } from 'react-router-dom';

import { ClientData, Spiner, ProductSelection } from '../../../components';
import { Query } from 'react-apollo';
import { GET_PRODUCTS } from '../../../queries';
// import { CREATE_ORDER } from "../../mutations";

export default ({ session }) => {
  const { clientId } = useParams();
  return (
    <>
      <h2 className='text-center mb-5'>Create Order </h2>
      <div className='container' >
        <div className='row' >
          <div className='col-md-3' >
            <ClientData />
          </div>
          <div className='col-md-9'>
            <Query query={GET_PRODUCTS} variables={{ byStock: true }}>
              {({ loading, error, data }) => {
                if (loading) return <Spiner />
                if (error) return `Error! ${error.message}`
                else {
                  return (
                    <ProductSelection
                      products={data.getProducts}
                    />
                  )
                }
              }}
            </Query>
          </div>
          {/* <ProductForm propMutation={CREATE_PRODUCT} /> */}
        </div>
      </div>
    </>
  )
}
