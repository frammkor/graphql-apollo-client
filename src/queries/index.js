// GRAPHQL
import gql from 'graphql-tag';

// ────────────────────────────────────────────────────────────────────────────────────────────────


// CLIENTS
export const GET_TOP_CLIENT_BY_SPENDS = gql`
query getTopClientBySpends {
  getTopClientBySpends {
    totalSpend
    clientInfo {
      clientId
      firstName
    }
  }
}
`;

export const GET_CLIENTS = gql`
query getClients ($limit: Int, $offset: Int, $userId: ID) {
  getClients (limit: $limit, offset: $offset, userId: $userId) {
    clientId
    userId
    firstName
    lastName
    company
    emails {
      email
    }
    age
      }
  getTotalClients
}
`;

export const GET_CLIENT_BY_ID = gql`
query getClientById ($clientId: ID!) {
  getClientById(clientId: $clientId) {
    clientId
    firstName
    lastName
    company
    emails {
      email
    }
    age
    type
  }
}
`;

// PRODUCTS
export const GET_PRODUCTS = gql`
query getProducts ($limit: Int, $offset: Int, $byStock: Boolean) {
  getProducts(limit: $limit, offset: $offset, byStock: $byStock) {
    id
    name
    stock
    price
  }
  getTotalProducts
}
`;

export const GET_PRODUCT_BY_ID = gql`
query getProductById ($id: ID!) {
  getProductById (id: $id) {
    name
    price
    id
    stock
  }
}
`;

// ORDERS
export const GET_ORDER_BY_CLIENT_ID = gql`
query getOrdersByClientId ($clientId: ID) {
  getOrdersByClientId (clientId: $clientId) {
    id
    productsRequested {
      id
      amount
    }
    totalPrice
    date
    clientId
    status
  }
}
`;

// USERS
export const GET_CURRENT_USER = gql`
query getCurrentUser {
  getCurrentUser {
    _id
    userName
    role
  }
}
`;

export const GET_TOP_SELLER_BY_SPENDS = gql`
query getTopSellerBySpends {
  getTopSellerBySpends {
    totalSpend
    userInfo {
      role
      userName
    }
  }
}
`;
