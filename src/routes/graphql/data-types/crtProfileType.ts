import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLInt } from "graphql";
import { UUIDType } from '../types/uuid.js';

export const crtProfileType = new GraphQLInputObjectType({
    name: 'CreateProfileInput',
    description: 'CreateProfileInput',
    fields: {
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
        memberTypeId: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(UUIDType) }
    }
});