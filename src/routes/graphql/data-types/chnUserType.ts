import { GraphQLInputObjectType, GraphQLString, GraphQLFloat } from "graphql";

export const chnUserType = new GraphQLInputObjectType({
    name: 'ChangeUserInput',
    description: 'ChangeUserInput',
    fields: {
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat }
    }
});