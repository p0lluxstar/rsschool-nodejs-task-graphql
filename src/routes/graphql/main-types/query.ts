import { PrismaClientUtils } from '../utils/prismaClientUtils.js';
import { GraphQLObjectType, GraphQLList, GraphQLOutputType } from 'graphql';
import { MemberType, MemberTypeIdType } from '../data-types/memberType.js';
import { PostType } from '../data-types/postType.js';
import { UserType } from '../data-types/userType.js';
import { ProfileType } from '../data-types/profileType.js';
import { UUIDType } from '../types/uuid.js';
import { MemberTypeId } from '../../member-types/schemas.js';

export const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {

    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async () => await PrismaClientUtils.memberType.findMany(),
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async () => {
        const result = await PrismaClientUtils.post.findMany();
        return result;
      },
    },

    users: {
      type: new GraphQLList(UserType),
      resolve: async () => {
        const result = await PrismaClientUtils.user.findMany();
        return result;
      },
    },
    
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async () => await PrismaClientUtils.profile.findMany(),
    },
    
    memberType: {
      type: MemberType as GraphQLOutputType,
      args: { id: { type: MemberTypeIdType } },
      resolve: async (_parent, { id }: { id: MemberTypeId }) =>
        await PrismaClientUtils.memberType.findUnique({ where: { id } }),
    },

    post: {
      type: PostType as GraphQLOutputType,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, { id }: { id: string }) => {
        const result = await PrismaClientUtils.post.findUnique({ where: { id } });
        return result;
      },
    },

    user: {
      type: UserType as GraphQLOutputType,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, { id }: { id: string }) =>
        await PrismaClientUtils.user.findUnique({ where: { id } }),
    },


     profile: {
      type: ProfileType as GraphQLOutputType,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, { id }: { id: string }) => {
        const result = await PrismaClientUtils.profile.findUnique({ where: { id } });
        return result;
      },
    },
  },
});
