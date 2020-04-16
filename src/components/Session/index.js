import React from 'react'
import { Query } from 'react-apollo'
import { GET_CURRENT_USER } from '../../queries'

const Session = Component => props => (
  <Query query={GET_CURRENT_USER} >
    {({ loading, error, data, refetch, startPolling, stopPolling }) => {
      if (loading) return null
      console.log(data)
      return <Component {...props} refetch={refetch} session={data.getCurrentUser} />
    }}
  </Query>
)

export default Session;