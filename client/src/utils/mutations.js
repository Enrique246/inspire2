import {gql} from '@apollo/client';

export const ADD_CART = gql`
    mutation addCart($products: [ID]!) {
        addCart(products: products) {
            products {
                _id
                name
                description
                price
                availability
                image
            }
        }
    }
`;

export const ADD_PRODUCT = gql`
mutation addProduct ($name: String!, $description: String!, $image:String!, $quantity: String!, $price: String!, $category:String!){
  addProduct(name:$name, description:$description,image:$image, quantity: $quantity, price: $price,category:$category){
     _id
      name
      description
      price
      quantity
      category {
        _id
        name
      }
  }
  
}
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addProfile(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addProfile(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
