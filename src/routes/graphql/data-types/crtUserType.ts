import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat } from "graphql";

export const crtUserType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  description: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) }
  }
});