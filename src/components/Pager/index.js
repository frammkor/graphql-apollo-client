import React from 'react'

export default ({ currentPage, limit, offset, setCurrentPage, setOffset, totalPages, }) => {

  const prevButton = (currentPage > 1) ?
    <button
      onClick={() => { setCurrentPage(currentPage - 1); setOffset(offset - limit) }}
      type='button'
      className='btn btn-success m-2'>
      &laquo; Previous
    </button> : '';

  const nextButton = (currentPage < totalPages) ?
    <button
      onClick={() => { setCurrentPage(currentPage + 1); setOffset(offset + limit) }}
      type='button'
      className='btn btn-success m-2'>Next &raquo;
    </button> : '';

  return (
    <div className='mt-5 d-flex justify-content-center'>
      {prevButton}{`Page: ${currentPage} of ${totalPages}`}{nextButton}
    </div>
  )
}
