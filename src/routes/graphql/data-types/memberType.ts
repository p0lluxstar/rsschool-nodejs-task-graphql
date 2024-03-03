import { GraphQLEnumType, GraphQLObjectType, GraphQLFloat, GraphQLInt, GraphQLList } from "graphql";
import { ProfileType } from "./profileType.js";

export interface InterfaceMemberType {
    id: string;
    discount: number;
    postsLimitPerMonth: number;
    /* profiles?: IProfile[]; */
  }

  export const MemberTypeIdType = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
      basic: {
        value: 'basic',
      },
      business: {
        value: 'business',
      },
    },
  }); 

export const MemberType = new GraphQLObjectType<InterfaceMemberType>({
    name: 'MemberType',
    fields: () => ({
      id: { type: MemberTypeIdType },
      discount: { type: GraphQLFloat },
      postsLimitPerMonth: { type: GraphQLInt },
      profiles: { type: new GraphQLList(ProfileType) },
    }),
  });