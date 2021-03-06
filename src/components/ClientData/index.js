import React from 'react';
import { Query } from 'react-apollo';
import { useParams } from 'react-router-dom';
import { GET_CLIENT_BY_ID } from '../../queries';
import { Spiner } from '..';

export default () => {
  const { clientId } = useParams();
  return (
    <>
      <h4 className="text-center mb-2">Client Info</h4>
      <Query query={GET_CLIENT_BY_ID} variables={{ clientId }} pollInterval={1000}>
        {({
          loading, error, data, startPolling, stopPolling,
        }) => {
          if (loading) {
            return <Spiner />;
          } if (error) {
            return `Error! ${error.message}`;
          }
          const {
            firstName, lastName, age, emails, company, type,
          } = data.getClientById;
          return (
            <ul className="list-unstyled">
              <li className="border font-weight-bold p-2">
                Name:
                <span className="font-weight-normal">
                  {` ${firstName} ${lastName}`}
                </span>
              </li>
              <li className="border font-weight-bold p-2">
                Age:
                <span className="font-weight-normal">
                  {` ${age}`}
                </span>
              </li>
              <li className="border font-weight-bold p-2">
                Emails:
                <span className="font-weight-normal">
                  {` ${emails.map((item) => ` ${item.email}`)}`}
                </span>
              </li>
              <li className="border font-weight-bold p-2">
                Company:
                <span className="font-weight-normal">
                  {` ${company}`}
                </span>
              </li>
              <li className="border font-weight-bold p-2">
                Client Type:
                <span className="font-weight-normal">
                  {` ${type}`}
                </span>
              </li>
            </ul>
          );
        }}
      </Query>
    </>
  );
};
