import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOutButton';

const IsAuthentiactedNavBar = ({ session }) => (
  <>
    <Link className="navbar-brand text-light font-weight-bold" to="/">CRM</Link>

    <button className="navbar-toggler mb-2" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navegacion">
      <ul className="navbar-nav ml-auto text-right">
        <li className="nav-item dropdown ml-md-2 mb-2 mb-ml-0">
          <button
            className="nav-link dropdown-toggle btn btn-block btn-info"
            data-toggle="dropdown"
          >
            Clients
          </button>
          <div className="dropdown-menu" aria-labelledby="navegation">
            <Link to="/clients" className="dropdown-item">
              List Clients
            </Link>
            <Link to="/client/new" className="dropdown-item">
              Create Client
            </Link>
          </div>
        </li>
        <li className="nav-item dropdown ml-md-2 mb-2 mb-ml-0">
          <button
            className="nav-link dropdown-toggle btn btn-block btn-success"
            data-toggle="dropdown"
          >
            Products
          </button>
          <div className="dropdown-menu" aria-labelledby="navegation">
            <Link to="/products" className="dropdown-item">
              List Products
            </Link>
            <Link to="/product/new" className="dropdown-item">
              Create Product
            </Link>
          </div>
        </li>
        {session.role === 'ADMIN' ? (
          <li className="nav-item dropdown ml-md-2 mb-2 mb-ml-0">
            <Link
              to="/register"
              className="nav-link btn btn-block btn-secondary"
            >
              Create Users
            </Link>
          </li>
        ) : ('')}
        <li className="nav-item dropdown ml-md-2 mb-2 mb-ml-0">
          <SignOutButton />
        </li>
      </ul>
    </div>
  </>
);

export default IsAuthentiactedNavBar;
