import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductForm, Spiner } from '../../../components';

// MAKING QUERIES
import { Query } from 'react-apollo';
import { GET_PRODUCT_BY_ID } from '../../../queries';
import { EDIT_PRODUCT } from '../../../mutations';

export default () => {
  const { id } = useParams();

  return (
    <>
      <h2 className='text-center mb-5' >Edit Product</h2>
      <div className='row justify-content-center' >
        <Query query={GET_PRODUCT_BY_ID} variables={{ id }}>
          {({ loading, error, data, refetch }) => {
            if (loading) {
              return <Spiner />
            } if (error) {
              return `Error! ${error.message}`
            } else {
              return (
                <ProductForm
                  product={data.getProductById}
                  propMutation={EDIT_PRODUCT}
                  refetch={refetch}
                />
              )
            }
          }}
        </Query>
      </div>
    </>
  )
}
