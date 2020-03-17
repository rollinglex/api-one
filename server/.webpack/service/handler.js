module.exports=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=require("apollo-server-lambda")},function(e,t,n){const{ApolloServer:o,gql:r}=n(0),{buildFederatedSchema:i}=n(2),d=new o({schema:i([{typeDefs:n(3),resolvers:n(4)}]),context:({event:e,context:t})=>({headers:e.headers,functionName:t.functionName,event:e,context:t})});t.graphql=d.createHandler({cors:{origin:"*",credentials:!0,methods:"GET, POST",allowedHeaders:"Origin, X-Requested-With, Content-Type, Accept, Authorization"}})},function(e,t){e.exports=require("@apollo/federation")},function(e,t,n){const{gql:o}=n(0),r=o`
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
    deleteTodo(input: DeleteTodoInput!): String
  }
  input AddTodoInput {
    id: ID!
    userId: String!
    description: String!
  }
  input DeleteTodoInput {
    id: ID!
    userId: String!
  }
  input EditTodoInput {
    userId: String!
    id:String!
    completed: Boolean
    description: String
    lastEdited: String
  }

`;e.exports=r},function(e,t,n){const o=n(5),r=new o.DynamoDB.DocumentClient;new o.DynamoDB;const{promisify:i}=n(6);n(7).config();const d={TableName:process.env.table},u=async({id:e,userId:t,description:n})=>{console.log("description",n);const o=(()=>{let e=new Date;const t=`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`,n=String(e.getDate()).padStart(2,"0");return`${String(e.getMonth()+1).padStart(2,"0")}/${n}/${e.getFullYear()} ${t}`})(),u={...d,Item:{id:e,userId:t,completed:!1,createdOn:o,description:n}},s=i(r.put).bind(r);return await s(u)},s={Query:{getTodos:()=>(async()=>{const e={...d},t=i(r.scan).bind(r);return(await t(e)).Items})()},Mutation:{addTodo:(e,{input:t})=>(u(t),t),deleteTodo:(e,{input:t})=>(console.log("input",t),(async({id:e,userId:t})=>{console.log("id",e);const n={...d,Key:{id:e,userId:t}};console.log("params",n);const o=i(r.delete).bind(r),u=await o(n);console.log("deleteTodo",u)})(t),t.id)}};e.exports=s},function(e,t){e.exports=require("aws-sdk")},function(e,t){e.exports=require("util")},function(e,t){e.exports=require("dotenv")}]);
//# sourceMappingURL=handler.js.map