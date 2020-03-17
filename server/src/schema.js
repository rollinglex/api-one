const { gql} = require('apollo-server-lambda')

const typeDefs = gql`
  type Todo {
    id: ID!
    userId: String!
    completed: Boolean!
    createdOn: String!
    description: String!
    lastEdited: String!
  }
  type Query {
    getTodos(userId: String!): [Todo]!
  }

  type Mutation {
    addTodo(input: AddTodoInput!): Todo
    editTodo(input: EditTodoInput!): Todo
    deleteTodo(input: String!): Todo
  }
  input AddTodoInput {
    id: ID!
    userId: String!
    description: String!
  }
  input EditTodoInput {
    userId: String!
    id:String!
    completed: Boolean
    description: String
    lastEdited: String
  }

`
module.exports = typeDefs