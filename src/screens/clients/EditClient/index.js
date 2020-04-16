import React from 'react';
import { useParams } from 'react-router-dom';
import { Query } from 'react-apollo';
import { ClientForm, Spiner } from '../../../components';

// MAKING QUERIES
import { GET_CLIENT_BY_ID } from '../../../queries';
import { EDIT_CLIENT } from '../../../mutations';

const EditClient = ({ session }) => {
  const { clientId } = useParams();
  return (
    <>
      <h2 className="text-center mb-5">Edit Client</h2>
      <div className="row justify-content-center">
        <Query query={GET_CLIENT_BY_ID} variables={{ clientId }}>
          {({
            loading, error, data, refetch,
          }) => {
            if (loading) {
              return <Spiner />;
            } if (error) {
              return `Error! ${error.message}`;
            }
            return (
              <ClientForm client={data.getClientById} propMutation={EDIT_CLIENT} refetch={refetch} session={session} />
            );
          }}
        </Query>
      </div>
    </>
  );
};

export default EditClient;
