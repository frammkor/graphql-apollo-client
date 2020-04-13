import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// APOLLO
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
// COMP
import { Header, Panel } from './components'
// SCREENS
import { ClientList, CreateClient, EditClient, CreateProduct, ProductList, EditProduct, CreateOrder, OrderListByClient } from './screens'

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache({
    addTypename: false,
  }),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Header />
          <Switch>
            <Route exact path='/clients' component={ClientList} />
            <Route exact path='/client/new' component={CreateClient} />
            <Route exact path='/client/edit/:id' component={EditClient} />
            <Route exact path='/products' component={ProductList} />
            <Route exact path='/product/new' component={CreateProduct} />
            <Route exact path='/product/edit/:id' component={EditProduct} />
            <Route exact path='/order/new/:id' component={CreateOrder} />
            <Route exact path='/orders/:id' component={OrderListByClient} />
            <Route exact path='/panel' component={Panel} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
