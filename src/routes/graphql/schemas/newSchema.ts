import { GraphQLSchema } from 'graphql/type/index.js';
import { Query } from '../main-types/query.js';

export const newSchema = new GraphQLSchema({
    query: Query,
   /*  mutation: Mutation, */
  });