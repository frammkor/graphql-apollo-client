import React from 'react'
import { GET_PRODUCT_BY_ID } from '../../queries'
import { Query } from 'react-apollo';
import { Spiner } from '../../components'

export const ProductDetails = ({ product, amount }) => {
  return (
    <Query
      query={GET_PRODUCT_BY_ID}
      variables={{ id: product.id }}
    >
      {({ loading, error, data, refetch }) => {
        if (loading) {
          return <Spiner />
        } if (error) {
          return `Error! ${error.message}`
        } else {
          const { name, price, stock } = data.getProductById;
          return (
            <li className='list-group-item border mb-2 p-2'>
              <p className='card-text font-weight-bold'>
                Name:
                <span className='font-weight-normal'> {name}</span>
              </p>
              <p className='card-text font-weight-bold'>
                Amount:
                <span className='font-weight-normal'> {amount}</span>
              </p>
              <p className='card-text font-weight-bold'>
                At stock:
                <span className='font-weight-normal'> {stock}</span>
              </p>
              <p className='card-text font-weight-bold'>
                Price per unit:
                <span className='font-weight-normal'> ${price}</span>
              </p>
            </li>
          )
        }
      }}
    </Query>
  )
}

export default ProductDetails;