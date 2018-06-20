const graphQL = require("graphql");
const lodash = require("lodash");
const axios = require("axios");

const {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = graphQL;

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
                return axios.get(`http://localhost:3000/users/${args.id}`).then(response => {
                    return response.data;
                }) 
            }
        }
    }  
});

module.exports = new GraphQLSchema({
    query : RootQuery
});