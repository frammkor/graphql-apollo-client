import React, { useState } from 'react';
import { Query } from 'react-apollo';

import { GET_PRODUCTS } from '../../../queries';

// COMP
import { ProductListItem, Pager, Spiner, } from '../../../components';
import { SuccessAlert } from '../../../components/Alerts/SuccessAlert';


const ProductList = () => {
  const [alert, setAlert] = useState({ show: false, message: '', })
  const willAlert = (alert.show) ? <SuccessAlert message={alert.message} /> : '';

  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  React.useEffect(() => {
    return () => {
    }
  }, []);
  return (
    <div className='container' >
      <Query
        query={GET_PRODUCTS}
        pollInterval={1000}
        variables={{ limit, offset }}
      >
        {({ loading, error, data, startPolling, stopPolling }) => {
          if (loading) return <Spiner />
          if (error) return `Error: ${error.message}`;
          return (
            <>
              <h2 className='text-center mb-5' >Products List</h2>
              {willAlert}
              <table className='table'>
                <thead>
                  <tr className='table-primary'>
                    <th scope='col'>Name</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>Stock</th>
                    <th scope='col'>Delete</th>
                    <th scope='col'>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {data.getProducts.map(({ name, id, stock, price }) => (
                    <ProductListItem
                      stock={stock}
                      price={price}
                      id={id}
                      key={id}
                      name={name}
                      setAlert={setAlert}
                    />
                  ))}
                </tbody>
              </table>
              <Pager
                currentPage={currentPage}
                limit={limit}
                offset={offset}
                setCurrentPage={setCurrentPage}
                setOffset={setOffset}
                totalPages={Math.ceil(Number(data.getTotalProducts) / limit)}
              />
            </>
          )
        }}
      </Query>
    </div >

  );
}

export default ProductList;
