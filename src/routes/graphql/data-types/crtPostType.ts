import { GraphQLInputObjectType, GraphQLNonNull,GraphQLString } from "graphql";
import { UUIDType } from '../types/uuid.js';

export const crtPostType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  description: 'CreatePostInput',
  fields: {
    authorId: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) }
  }
});