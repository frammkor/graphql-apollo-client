import React, { useState, useEffect } from 'react';
import { Query } from 'react-apollo';

import { GET_CLIENTS } from '../../../queries';

// COMP
import { ClientListItem, Pager, Spiner } from '../../../components';
import { SuccessAlert } from '../../../components/Alerts/SuccessAlert';

const ClientList = () => {
  const [alert, setAlert] = useState({ show: false, message: '', })
  const willAlert = (alert.show) ? <SuccessAlert message={alert.message} /> : '';

  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  useEffect(() => {
    return () => {

    }
  })

  return (
    <div className='container' >
      <Query
        query={GET_CLIENTS}
        pollInterval={1000}
        variables={{ limit, offset }}
      >
        {({ loading, error, data, startPolling, stopPolling }) => {
          if (loading) return <Spiner />
          if (error) return `Error: ${error.message}`;
          return (
            <>
              <h2 className='text-center mb-5' >Clients List</h2>
              {willAlert}
              <ul className='list-group' >
                {data.getClients.map(({ company, firstName, id, lastName }) => (
                  <ClientListItem
                    company={company}
                    firstName={firstName}
                    id={id}
                    key={id}
                    lastName={lastName}
                    setAlert={setAlert}
                  />
                ))}
              </ul>
              <Pager
                currentPage={currentPage}
                limit={limit}
                offset={offset}
                setCurrentPage={setCurrentPage}
                setOffset={setOffset}
                totalPages={Math.ceil(Number(data.getTotalClients) / limit)} />
            </>
          )
        }}
      </Query>
    </div >

  );
}

export default ClientList;