import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Mutation } from 'react-apollo';

export default (props) => {
  // recives a mutatation and depending on the screen that calls this component we migth recive a client info to edit
  const { product, propMutation } = props;
  const history = useHistory();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (product) {
      setStock(product.stock);
      setPrice(product.price);
      setName(product.name);
      setId(product.id);
    }
    return () => {
    };
  }, [product]);

  // FORM & MUTATION
  const sendFrom = (e, mutation) => {
    e.preventDefault();
    const input = {
      id,
      name,
      price: Number(price),
      stock: Number(stock),
    };
    mutation({ variables: { input } });
  };

  // AFTER MUTATION ENDS
  const redirect = () => {
    if (product) {
      const { refetch } = props;
      refetch().then(() => history.push('/products'));
    } else {
      history.push('/products');
    }
  };

  const validateProductForm = () => {
    const toReturn = !name || !price || !stock;
    return toReturn;
  };

  return (
    <>
      <Mutation
        mutation={propMutation}
        onCompleted={redirect}
      >
        {(runMutation) => (
          <form
            className="col-md-8"
            onSubmit={(e) => sendFrom(e, runMutation)}
          >
            <div className="form-group">
              <label>Name:</label>
              <input
                defaultValue={name}
                type="text"
                name="name"
                className="form-control"
                placeholder="Product's name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">$</div>
                </div>
                <input
                  defaultValue={price}
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="Product's price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Stock:</label>
              <input
                defaultValue={stock}
                type="number"
                name="stock"
                className="form-control"
                placeholder="Product's stock"
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <button
              disabled={validateProductForm()}
              type="submit"
              className="btn btn-success float-right"
            >
              Save Product
            </button>
          </form>
        )}
      </Mutation>
    </>
  );
};
