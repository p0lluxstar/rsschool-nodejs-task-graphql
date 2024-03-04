import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema} from './schemas/schemas.js';
import { graphql } from 'graphql';
import { newSchema } from './schemas/newSchema.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const dataTest = await graphql({
        schema: newSchema,
        source: req.body.query,
        variableValues: req.body.variables,
      });
  
      return dataTest;
    },
  });
};

export default plugin;
