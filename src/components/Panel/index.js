import React from 'react';
import { Query } from 'react-apollo';
import {
  BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar,
} from 'recharts';
import { Spiner } from '..';
import { GET_TOP_CLIENT_BY_SPENDS, GET_TOP_SELLER_BY_SPENDS } from '../../queries';

const Panel = () => (
  <>
    <h1 className="text-center my-5">Top 10 Best Clients</h1>
    <Query query={GET_TOP_CLIENT_BY_SPENDS}>
      {({ loading, error, data }) => {
        if (loading) return <Spiner />;
        if (error) return 'Error &{error}';
        if (data) {
          const dataForChart = [];
          data.getTopClientBySpends.map((order, index) => {
            dataForChart[index] = {
              ...order.clientInfo[0],
              totalSpend: order.totalSpend,
            };
            return dataForChart;
          });
          if (!dataForChart || dataForChart.length === 0) {
            return (
              <h5 className="text-center my-8">No orders where compleated yet</h5>
            );
          }
          return (
            <>
              <div className="row justify-content-center">
                <BarChart
                  width={600}
                  height={300}
                  data={dataForChart}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="firstName" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalSpend" fill="#8884d8" />
                </BarChart>
              </div>
            </>
          );
        }
      }}
    </Query>
    <h1 className="text-center my-5">Top 10 Best Sellers</h1>
    <Query query={GET_TOP_SELLER_BY_SPENDS}>
      {({ loading, error, data }) => {
        if (loading) return <Spiner />;
        if (error) return 'Error &{error}';
        if (data) {
          const dataForChart = [];
          data.getTopSellerBySpends.map((order, index) => {
            dataForChart[index] = {
              ...order.userInfo[0],
              totalSpend: order.totalSpend,
            };
            return dataForChart;
          });
          if (!dataForChart || dataForChart.length === 0) {
            return (
              <h5 className="text-center my-8">No orders where compleated yet</h5>
            );
          }
          return (
            <>
              <div className="row justify-content-center">
                <BarChart
                  width={600}
                  height={300}
                  data={dataForChart}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="userName" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalSpend" fill="#8884d8" />
                </BarChart>
              </div>
            </>
          );
        }
      }}
    </Query>
  </>
);

export default Panel;
