const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema} = require('graphql');
const axios = require('axios');

const LAUNCH_API = 'https://api.spacexdata.com/v3/launches';
const ROCKET_API = 'https://api.spacexdata.com/v3/rockets';

// Launch Type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: {type: GraphQLInt},
        mission_name: {type: GraphQLString},
        launch_year: {type: GraphQLString},
        launch_date_local: {type: GraphQLString},
        launch_success: {type: GraphQLBoolean},
        rocket: {type: RocketType},
    })
});

// Rocket Type
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: {type: GraphQLString},
        rocket_name: {type: GraphQLString},
        rocket_type: {type: GraphQLString},
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios.get(LAUNCH_API).then( response => response.data);
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: {type: GraphQLInt}
            },
            resolve(parent, args) {
                return axios.get(`${LAUNCH_API}/${args.flight_number}`).then( response  => response.data);
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parent, args) {
                return axios.get(ROCKET_API).then( response => response.data);
            }
        },
        rocket: {
            type: RocketType,
            args: {
                rocket_id: {type: GraphQLInt}
            },
            resolve(parent, args) {
                return axios.get(`${LAUNCH_API}/${args.rocket_id}`).then( response  => response.data);
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery,
});