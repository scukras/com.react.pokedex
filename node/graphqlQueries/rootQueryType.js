const {GraphQLObjectType, GraphQLString, GraphQLList} = require('graphql');
const DbService = require('../services/DbService');
const EncounterMethodsType = require('../graphqlTypes/EncounterMethodsType');
const GameVersionsType = require('../graphqlTypes/GameVersionsType');
const LocationAreaEncountersType = require('../graphqlTypes/LocationAreaEncountersType');
const PokemonType = require('../graphqlTypes/PokemonType');
const StatsType = require('../graphqlTypes/StatsType');

const collections = {
    encounterMethods: 'encounter_methods',
    gameVersions: 'game_versions',
    locationAreaEncounters: 'location_area_encounters',
    pokemon: 'pokemon',
    stats: 'stats'
};

const connectTobDb = async () => {
    await DbService.connect(process.env);
};
connectTobDb();

module.exports.rootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        encounterMethods: {
            type: new GraphQLList(EncounterMethodsType),
            description: '',
            resolve: async (parent) => {
                return await DbService.getDb().collection(collections.encounterMethods).find().toArray()
            } 
        },
        gameVersions: {
            type: new GraphQLList(GameVersionsType),
            description: '',
            resolve: async (parent) => {
                return await DbService.getDb().collection(collections.gameVersions).find().toArray()
            }
        },
        locationAreaEncounters: {
            type: new GraphQLList(LocationAreaEncountersType),
            description: '',
            resolve: async (parent) => {
                return await DbService.getDb().collection(collections.locationAreaEncounters).find().toArray()
            }
        },
        pokemon: {
            type: new GraphQLList(PokemonType),
            description: '',
            resolve: async (parent) => {
                return await DbService.getDb().collection(collections.pokemon).find().toArray()
            }
        },
        stats: {
            type: new GraphQLList(StatsType),
            description: '',
            resolve: async (parent) => {
                return await DbService.getDb().collection(collections.stats).find().toArray()
            }
        }
    })
});