import React from 'react'
import { Spiner } from '..';
import { Query } from 'react-apollo';
import { GET_TOP_CLIENT_BY_SPENDS } from '../../queries';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

const Panel = () => {
  return (
    <Query query={GET_TOP_CLIENT_BY_SPENDS} >
      {({ loading, error, data }) => {
        if (loading) return <Spiner />
        if (error) return `Error &{error}`
        if (data) {
          const dataForChart = [];
          data.getTopClientBySpends.map((order, index) => {
            dataForChart[index] = {
              ...order.clientInfo[0],
              totalSpend: order.totalSpend,
            }
          })
          return (
            <>
              <h1 className='text-center my-5'>Top 10 Most Buyers Clients</h1>
              <div className='row justify-content-center'>
                <BarChart width={600} height={300} data={dataForChart} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey='firstName' />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='totalSpend' fill='#8884d8' />
                </BarChart>
              </div>
            </>
          )
        }
      }}

    </Query>
  )
}

export default Panel;
