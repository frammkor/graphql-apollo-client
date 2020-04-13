import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo'
import { DELETE_PRODUCT } from '../../mutations'

export default ({ id, name, price, setAlert, stock }) => {
  let bgColor = '';
  if (stock < 50) { bgColor = 'less-item-bg-color' }
  if (stock === 0) { bgColor = 'no-stock-item-bg-color' }
  return (
    <tr className={`${bgColor}`}>
      <td>{name}</td>
      <td>{price}</td>
      <td>{stock}</td>
      <td><Mutation
        mutation={DELETE_PRODUCT}
        onCompleted={(data) => setAlert({ show: true, message: data.deleteProduct, })}
      >
        {runMutation => (
          <button
            onClick={() => {
              if (window.confirm('Do you want to delete this product?')) {
                runMutation({ variables: { id } })
              }
            }}
            type="button"
            className="btn btn-danger">
            <b>&times;</b> Delete Product
          </button>
        )}
      </Mutation></td>
      <td><Link to={`/product/edit/${id}`} className='btn btn-success'>
        Edit Product
        </Link></td>

    </tr >
  );
}
