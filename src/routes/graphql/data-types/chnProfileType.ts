import { GraphQLInputObjectType, GraphQLBoolean } from "graphql";

export const chnProfileType = new GraphQLInputObjectType({
    name: 'ChangeProfileInput',
    description: 'ChangeProfileInput',
    fields: {
        isMale: { type: GraphQLBoolean}
    } 
});