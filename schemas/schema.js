const graphQL = require("graphql");
const lodash = require("lodash");
const {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = graphQL;

const users = [
    {id: '1', firstName: 'Kake', age: 25},
    {id: '2', firstName: 'Amc', age: 55},
    {id: '3', firstName: 'Lolo', age: 35}
];

const UserType = new GraphQLObjectType({
    name: 'User',
    fields : {
        id: { type : GraphQLString},
        firstName : { type : GraphQLString},
        age: { type: GraphQLInt}
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields : {
        user: {
            type: UserType,
            args: {id : {type: GraphQLString}},
            resolve(parentValue, args) {
               return lodash.find(users, {id: args.id})
            }
        }
    }  
});

module.exports = new GraphQLSchema({
    query : RootQuery
});