import { PrismaClientUtils } from '../utils/prismaClientUtils.js';
import { GraphQLObjectType, GraphQLList, GraphQLOutputType, GraphQLEnumType } from 'graphql';
import { MemberType} from '../data-types/memberType.js';
import { PostType } from '../data-types/postType.js';
import { UserType } from '../data-types/userType.js';
import { ProfileType } from '../data-types/profileType.js';
import { UUIDType } from '../types/uuid.js';
import { MemberTypeId } from '../../member-types/schemas.js';

export const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'QueryType',
  fields: {

    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async () => await PrismaClientUtils.memberType.findMany(),
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async () => await PrismaClientUtils.post.findMany(),
    },

    users: {
      type: new GraphQLList(UserType),
      resolve: async () => await PrismaClientUtils.user.findMany(),
    },
    
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async () => await PrismaClientUtils.profile.findMany(),
    },
    
    memberType: {
      type: MemberType as GraphQLOutputType,
      args: {  id: {type: new GraphQLEnumType({
        name: 'MemberTypeId',
        description: 'MemberTypeId',
        values: {
          basic: {
          value: 'basic',
        },
        business: {
          value: 'business',
        },
        },
        })
      }},
      resolve: async (_root, { id }: { id: MemberTypeId }) => await PrismaClientUtils.memberType.findUnique({ where: { id } }),
    },

    post: {
      type: PostType as GraphQLOutputType,
      args: { id: { type: UUIDType } },
      resolve: async (_root, { id }: { id: string }) => await PrismaClientUtils.post.findUnique({ where: { id } }),
    },

    user: {
      type: UserType as GraphQLOutputType,
      args: { id: { type: UUIDType } },
      resolve: async (_root, { id }: { id: string }) => await PrismaClientUtils.user.findUnique({ where: { id } }),
    },

     profile: {
      type: ProfileType as GraphQLOutputType,
      args: { id: { type: UUIDType } },
      resolve: async (_root, { id }: { id: string }) => await PrismaClientUtils.profile.findUnique({ where: { id } }),
    },
  },
});
