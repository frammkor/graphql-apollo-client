import React from 'react'
import { Link } from 'react-router-dom'

const NotAuthenticatedNavBar = () => (
  <>
    <Link className="navbar-brand text-light font-weight-bold" to='/'>CRM</Link>
    <Link
      to='/login'
      className='btn btn-secondary d-block'
    >
      Login
</Link>
  </>
)

export default NotAuthenticatedNavBar;
