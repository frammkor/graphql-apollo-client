import React from 'react'
import { Query } from 'react-apollo';
import { GET_CLIENT_BY_ID } from '../../queries';
import { Spiner } from '..';
import { useParams } from 'react-router-dom';

export default () => {
  const { clientId: id } = useParams();
  return (
    <>
      <h4 className='text-center mb-2'>Client Info</h4>
      <Query query={GET_CLIENT_BY_ID} variables={{ id }} pollInterval={1000}>
        {({ loading, error, data, startPolling, stopPolling }) => {
          if (loading) {
            return <Spiner />
          } if (error) {
            return `Error! ${error.message}`
          } else {
            const { firstName, lastName, age, emails, company, type } = data.getClientById;
            return (
              <ul className='list-unstyled'>
                <li className='border font-weight-bold p-2'>
                  Name:
                    <span className='font-weight-normal'>
                    {' ' + firstName + ' ' + lastName}
                  </span>
                </li>
                <li className='border font-weight-bold p-2'>
                  Id:
                    <span className='font-weight-normal'>
                    {' ' + id}
                  </span>
                </li>
                <li className='border font-weight-bold p-2'>
                  Age:
                    <span className='font-weight-normal'>
                    {' ' + age}
                  </span>
                </li>
                <li className='border font-weight-bold p-2'>
                  Emails:
                    <span className='font-weight-normal'>
                    {' ' + emails.map(item => ` ${item.email}`)}
                  </span>
                </li>
                <li className='border font-weight-bold p-2'>
                  Company:
                    <span className='font-weight-normal'>
                    {' ' + company}
                  </span>
                </li>
                <li className='border font-weight-bold p-2'>
                  Client Type:
                    <span className='font-weight-normal'>
                    {' ' + type}
                  </span>
                </li>
              </ul>
              // <ClientForm client={data.getClientById} propMutation={EDIT_CLIENT} refetch={refetch} />
            )
          }
        }}
      </Query>
    </>
  )
}
