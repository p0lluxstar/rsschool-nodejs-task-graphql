import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString} from "graphql";

export const SubInput = new GraphQLInputObjectType({
    name: 'SubInput',
    description: 'SubInput',
    fields: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLString) }
    }
});