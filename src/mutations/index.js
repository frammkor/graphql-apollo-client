import gql from "graphql-tag";

// CLIENTS

export const CREATE_CLIENT = gql`
mutation createClient ($input: ClientInput) {
  createClient (input: $input) {
    id
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
    id
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
mutation deleteClient ($id: ID!) {
  deleteClient (id: $id)
}
`

// PRODUCTS

export const CREATE_PRODUCT = gql`
mutation createProduct ($input: ProductInput) {
  createProduct (input: $input) {
    name
    price
    stock
  }
}
`

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
`

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
`

export const UPDATE_ORDER = gql`
  mutation updateOrder ($input: OrderInput) {
    updateOrder(input: $input)
}
`