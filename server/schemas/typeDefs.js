const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
  _id: ID
  name: String
  } 

  type Product {
  _id: ID
  name: String
  description: String
  image: String
  availability: String
  price: String
  category: Category
  }

  type Order {
  _id: ID
  purchaseDate: String
  products: [Product]
  orders: [Order]
  stock: [Stock]
  }

  type Stock {
  _id: ID
  products: [Product]
  }

  type Profile {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Checkout {
  session: ID
  }

  type Auth {
    token: ID
    user: Profile
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    allproducts: [Product]
    product(_id: ID!): Product
    order(_id: ID!): Order
    stock(_id: ID!): Stock
    checkout(products: [ID]!): Checkout
    profiles: [Profile]
    profile(profileId: ID!): Profile
  }
  type Mutation {
    addProfile(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): Profile
    login(email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateProduct(_id: ID!, availability: Int!): Product
    updateQuantityProduct(_id: ID!, availability: Int!): Product
    addProduct(name: String!, description: String!, image:String!, price:String!, availability:String!,category: String!):Product
    addStock(products: [ID]!): Stock
    addCategory(name: String!): Category
    deleteUserProduct(_id: ID!):Product
    deleteProduct(_id: ID!):String
  }
`;

module.exports = typeDefs;
