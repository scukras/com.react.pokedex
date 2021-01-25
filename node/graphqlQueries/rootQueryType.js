const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt} = require('graphql');
const DbService = require('../services/DbService');
const EncounterMethodsType = require('../graphqlTypes/EncounterMethodsType');
const GameVersionsType = require('../graphqlTypes/GameVersionsType');
const LocationAreaEncountersType = require('../graphqlTypes/LocationAreaEncountersType');
const PokemonType = require('../graphqlTypes/PokemonType');
const StatsType = require('../graphqlTypes/StatsType');
const MovesType = require('../graphqlTypes/MovesType');

const collections = {
    encounterMethods: 'encounter_methods',
    gameVersions: 'game_versions',
    locationAreaEncounters: 'location_area_encounters',
    pokemon: 'pokemon',
    stats: 'stats',
    moves: 'moves'
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
            args: {
                id: { type: GraphQLInt },
                name: { type: GraphQLString }
            },
            resolve: async (parent, args) => {

                if (!args.id && !args.name) {
                    return await DbService.getDb().collection(collections.pokemon).find(args).toArray()
                }
                
                const moves = [];
                const docs = await DbService.getDb().collection(collections.pokemon).find(args).toArray()
                
                docs[0].moves.forEach(move => {
                    const version_group_details = [];

                    move.version_group_details.forEach(detail => {
                        if (detail.version_group.name === 'red-blue' || detail.version_group.name === 'yellow') {
                            version_group_details.push(detail);
                        }
                    });

                    if (version_group_details.length > 0) {
                        delete move.version_group_details;
                        move['version_group_details'] = version_group_details;
                        moves.push(move);
                    }

                });

                let filteredDocs = docs[0];
                delete filteredDocs.moves;
                filteredDocs['moves'] = moves;
                return [filteredDocs];
            }
        },
        stats: {
            type: new GraphQLList(StatsType),
            description: '',
            resolve: async (parent) => {
                return await DbService.getDb().collection(collections.stats).find().toArray()
            }
        },
        moves: {
            type: new GraphQLList(MovesType),
            description: '',
            args: {
                id: { type: GraphQLList(GraphQLInt) },
                name: { type: GraphQLList(GraphQLString) }
            },
            resolve: async (parent, args) => {
                let query;
                
                if (args.id && !args.name)
                    query = { id: { $in: args.id } };
                else if (!args.id && args.name)
                    query = { name: { $in: args.name } };
                else 
                    query = { id: { $in: args.id }, name: { $in: args.name } };
                    
                return await DbService.getDb().collection(collections.moves).find(query).toArray();
            }
        }
    })
});