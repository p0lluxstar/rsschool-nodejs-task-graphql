import { PrismaClientUtil } from '../utils/prismaClientUtils.js';
import { GraphQLObjectType, GraphQLList, GraphQLEnumType, GraphQLOutputType } from 'graphql';
import { MemberType} from '../data-types/memberType.js';
import { PostType } from '../data-types/postType.js';
import { UserType } from '../data-types/userType.js';
import { ProfileType } from '../data-types/profileType.js';
import { UUIDType } from '../types/uuid.js';
import { MemberTypeId } from '../../member-types/schemas.js';

const memberTypeList = new GraphQLList(MemberType);
const postTypeList = new GraphQLList(PostType);
const userTypeList = new GraphQLList(UserType);
const ProfileTypeList = new GraphQLList(ProfileType);

export const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'QueryType',
  fields: {
    memberTypes: {
      type: memberTypeList,
      resolve: async () => await PrismaClientUtil.memberType.findMany(),
    },

    posts: {
      type: postTypeList,
      resolve: async () => await PrismaClientUtil.post.findMany(),
    },

    users: {
      type: userTypeList,
      resolve: async () => await PrismaClientUtil.user.findMany(),
    },
    
    profiles: {
      type: ProfileTypeList,
      resolve: async () => await PrismaClientUtil.profile.findMany(),
    },
    
    memberType: {
      type: <GraphQLOutputType> MemberType,
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
      resolve: async (_root, { id }: { id: MemberTypeId }) => await PrismaClientUtil.memberType.findUnique({ where: { id } }),
    },

    post: {
      type: <GraphQLOutputType> PostType,
      args: { id: { type: UUIDType } },
      resolve: async (_root, { id }: { id: string }) => await PrismaClientUtil.post.findUnique({ where: { id } }),
    },

    user: {
      type: <GraphQLOutputType> UserType,
      args: { id: { type: UUIDType } },
      resolve: async (_root, { id }: { id: string }) => await PrismaClientUtil.user.findUnique({ where: { id } }),
    },

     profile: {
      type: <GraphQLOutputType> ProfileType,
      args: { id: { type: UUIDType } },
      resolve: async (_root, { id }: { id: string }) => await PrismaClientUtil.profile.findUnique({ where: { id } }),
    },
  },
});
