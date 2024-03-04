import { GraphQLObjectType, GraphQLFloat, GraphQLInt, GraphQLList,GraphQLString } from "graphql";
import { ProfileType } from "./profileType.js";

export interface InterfaceMemberType {
    id: string;
    discount: number;
    postsLimitPerMonth: number;
  }

const profileTypeList = new GraphQLList(ProfileType)

export const MemberType = new GraphQLObjectType<InterfaceMemberType>({
  name: 'MemberType',
  description: 'MemberType',
  fields: () => ({
    id: {
      type: GraphQLString,
      enumValues: ['basic', 'business'],
      },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: { type: profileTypeList },
  }),
});