import React from 'react';

export default ({ product, handleAmountChange, handleDeltetion }) => {
  const {
    name, price, stock, id,
  } = product;
  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
      <td>{stock}</td>
      <td>
        <input
          type="number"
          className="form-control"
          onChange={(e) => {
            if (e.target.value > stock) { e.target.value = stock; }
            if (e.target.value < 0) { e.target.value = 1; }
            handleAmountChange(e.target.value, id);
          }}
          max={stock}
          defaultValue={0}
          min={1}
        />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger font-weight-bold"
          onClick={() => handleDeltetion(id)}
        >
          &times; Remove
        </button>
      </td>
    </tr>
  );
};
