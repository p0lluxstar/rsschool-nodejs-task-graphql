import { GraphQLSchema } from 'graphql/type/index.js';
import { QueryTypes } from '../main-types/queryTypes.js';
import { MutationTypes } from '../main-types/mutationTypes.js';

export const newSchema = new GraphQLSchema({
    query: QueryTypes,
    mutation: MutationTypes, 
});