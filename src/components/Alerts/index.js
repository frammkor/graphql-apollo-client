import React from 'react';

export const SuccessAlert = ({ message }) => (
  <p className="alert alert-success py-3 text-center">
    {message}
  </p>
);

export const WarningAlert = ({ message }) => (
  <p className="alert alert-danger text-center">
    -
    {' '}
    {message}
  </p>
);
