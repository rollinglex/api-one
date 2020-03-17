const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient() 
var dynamodb = new AWS.DynamoDB();
const { promisify } = require("util");
require('dotenv').config();
const table = {
  TableName: process.env.table,
}
const formatDateNow = () => {
  // returns current date and time in format: mm/dd//yyyy hh:mm
  let today = new Date();
  const hours = String(today.getHours()).padStart(2, '0')
  const minutes = String(today.getMinutes()).padStart(2, '0')
  const time = `${hours}:${minutes}`
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  return `${mm}/${dd}/${yyyy} ${time}`
}
const getTodos = async () => {
  //gets all todos
  // used scan because the size of this table is relatively small
    const params = { ...table}
    const dynamodbScan = promisify(docClient.scan).bind(docClient)
    let todos = await dynamodbScan(params)
    return todos.Items
  }
  const addTodo =  async ({id, userId, description}) => {
    console.log('description',description);
    const createdOn = formatDateNow()
    const params = {
      ...table,
      Item: {
        id,
        userId,
        completed: false,
        createdOn,
        description,
      }
    }
    const dynamodbPut = promisify(docClient.put).bind(docClient)
    const addingTodo = await dynamodbPut(params)
    return addingTodo
  }
  const deleteTodo =  async ({id, userId}) => {
    console.log('id',id);

    const params = {
      ...table,
      Key: {
        id: id,
        userId: userId        
      }
    }
    console.log('params',params);
    const dynamodbDelete = promisify(docClient.delete).bind(docClient)
    const deleteTodo = await dynamodbDelete (params)
    console.log('deleteTodo',deleteTodo);
    return deleteTodo
  }
  const resolvers = {
    Query: {
      getTodos(){
        return getTodos()
      }
    },
    Mutation: {
      addTodo (_, {input}){
        addTodo(input)
        return input
      },
      deleteTodo (_, {input}){
        console.log('input',input);
        deleteTodo(input)
        return input.id
      }

    }
  }

  module.exports = resolvers