import gql from 'graphql-tag';

// CLIENTS

export const CREATE_CLIENT = gql`
mutation createClient ($input: ClientInput) {
  createClient (input: $input) {
    clientId
    firstName
    lastName
    company
    age
  	emails {
      email
    }
  }
}`;

export const EDIT_CLIENT = gql`
mutation updateClient ($input: ClientInput) {
  updateClient (input: $input) {
    clientId
    firstName
    lastName
    company
    type
    age
  	emails {
      email
    }
  }
}
`;

export const DELETE_CLIENT = gql`
mutation deleteClient ($clientId: ID!) {
  deleteClient (clientId: $clientId)
}
`;

// PRODUCTS

export const CREATE_PRODUCT = gql`
mutation createProduct ($input: ProductInput) {
  createProduct (input: $input) {
    name
    price
    stock
  }
}
`;

export const EDIT_PRODUCT = gql`
mutation updateProduct ($input: ProductInput) {
  updateProduct (input: $input) {
    name
    price
    stock
    id
  }
}
`;

export const DELETE_PRODUCT = gql`
mutation deleteProduct ($id: ID!) {
  deleteProduct (id: $id)
}
`;

// ORDERS
export const CREATE_ORDER = gql`
mutation createOrder ($input: OrderInput) {
  createOrder(input: $input) {
    id
    clientId
    totalPrice
    date
    status
    productsRequested {
      amount
      id
    }
  }
}
`;

export const UPDATE_ORDER = gql`
  mutation updateOrder ($input: OrderInput) {
    updateOrder(input: $input)
}
`;

// USERS
export const CREATE_USER = gql`
  mutation createUser ($input: UserInput) {
  createUser (input: $input) {
      status
      message
  }
}
`;
export const AUTHENTICATE_USER = gql`
mutation authenticate ($input: UserInput) {
  authenticateUser (input: $input) {
    token
  }
}
`;
