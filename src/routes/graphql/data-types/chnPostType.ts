import { GraphQLInputObjectType, GraphQLString } from "graphql";

export const chnPostType = new GraphQLInputObjectType({
    name: 'ChangePostInput',
    description: 'ChangePostInput',
    fields: {
        title: { type: GraphQLString }
    } 
});