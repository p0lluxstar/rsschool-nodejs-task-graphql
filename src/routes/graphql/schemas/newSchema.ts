import { GraphQLSchema } from 'graphql/type/index.js';
import { QueryType } from '../main-types/queryType.js';

export const newSchema = new GraphQLSchema({
    query: QueryType,
   /*  mutation: Mutation, */
  });