import React from 'react'

export const SuccessAlert = ({ message }) => {
  return (
    <p className='alert alert-success py-3 text-center'>
      {message}
    </p>
  )
}
