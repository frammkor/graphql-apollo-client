import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import Animated from 'react-select/animated'
import SelectedProductItem from './SelectedProductItem'
import SubmitOrderButton from './SubmitOrderButton'

const ProductSelection = ({ userId, products }) => {
  const [productsToOrder, setProductsToOrder] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const handleAmountChange = (value, id) => {
    productsToOrder.map(product => { if (product.id === id) product.amount = Number(value) });
    updateTotalPrice();
  }

  const updateTotalPrice = () => {
    let newPrice = 0;
    if (productsToOrder.length) {
      productsToOrder.map(product => {
        if (product.amount) {
          newPrice += product.amount * product.price
        }
      });
    }
    setTotalPrice(newPrice);
  }
  const deleteSelectedProduct = (id) => {
    productsToOrder.map(product => { if (product.id === id) product.amount = 0 });
    const newList = productsToOrder.filter(product => product.id !== id);
    setProductsToOrder(newList);
  }

  const MultiValueRemove = () => ' ';

  return (
    <>
      <h3 className='text-center mb-5' >Select products</h3>
      <Select
        onChange={(selectedItems) => {
          if (selectedItems === null) { setProductsToOrder([]); return }
          setProductsToOrder(selectedItems);
        }}
        options={products}
        isMulti={true}
        components={Animated()}
        placeholder='Chose some products'
        getOptionValue={(options) => options.id}
        getOptionLabel={(options) => options.name}
        value={productsToOrder}
        isClearable={false}
        clearValue={false}
        components={{ MultiValueRemove }}
      />
      {
        productsToOrder.length ? (
          <>
            <div className='row  mt-3'>
              <h4 className='text-center col-8 float-left' >Sumary</h4>
              <p className='font-weight-bold float-rigth col-4'  >
                Total:
              <span className='font-weight-normal'>
                  $ {totalPrice}
                </span>
              </p>
            </div>

            <table className='table'>
              <thead className='bg-success text-light'>
                <tr className='font-weight-bold'>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Amount</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {productsToOrder.map((product, index) => (
                  <SelectedProductItem
                    product={product}
                    key={product.id}
                    handleAmountChange={handleAmountChange}
                    handleDeltetion={deleteSelectedProduct}
                  />
                ))}
              </tbody>
            </table>
            <SubmitOrderButton totalPrice={totalPrice} productsToOrder={productsToOrder} />
          </>) : ('')
      }
    </>
  )
}

export default ProductSelection;
