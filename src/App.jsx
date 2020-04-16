import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// APOLLO
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
// COMP
import { Session, Header, Panel } from './components'
// SCREENS
import { ClientList, CreateClient, EditClient, CreateProduct, ProductList, EditProduct, CreateOrder, OrderListByClient } from './screens'
// AUTH
import { RegisterScreen, LoginScreen } from './auth'

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",

  fetchOptions: {
    credentials: 'include',
  },

  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },

  cache: new InMemoryCache({
    addTypename: false,
  }),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

const AppRoutes = ({ refetch, session }) => {
  return (
    <Router>
      <>
        <Header session={session} />
        <Switch>
          <Route exact path='/clients' render={() => <ClientList session={session} />} />
          <Route exact path='/client/new' render={() => <CreateClient session={session} />} />
          <Route exact path='/client/edit/:clientId' render={() => <EditClient session={session} />} />
          <Route exact path='/products' component={ProductList} />
          <Route exact path='/product/new' component={CreateProduct} />
          <Route exact path='/product/edit/:id' component={EditProduct} />
          <Route exact path='/order/new/:clientId' render={() => <CreateOrder session={session} />} />
          <Route exact path='/orders/:clientId' render={() => <OrderListByClient session={session} />} />
          <Route exact path='/panel' component={Panel} />
          <Route exact path='/login' render={() => <LoginScreen refetch={refetch} />} />
          {session && session.role === "ADMIN" ? (
            <Route exact path='/register' component={RegisterScreen} />
          ) : ('')}
        </Switch>
      </>
    </Router>
  );
}

const RouteSession = Session(AppRoutes);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <RouteSession />
    </ApolloProvider>
  )
}

export default App;