import React from 'react';
import { ClientForm } from '../../../components';
import { CREATE_CLIENT } from "../../../mutations";

const CreateClient = () => {
  return (
    <>
      <h2 className='text-center mb-5' >Create Client</h2>
      <div className='row justify-content-center' >
        <ClientForm propMutation={CREATE_CLIENT} />
      </div>
    </>
  )
}

export default CreateClient;