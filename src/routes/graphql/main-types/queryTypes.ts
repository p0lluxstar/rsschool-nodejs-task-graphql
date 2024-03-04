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

export const QueryTypes = new GraphQLObjectType({
  name: 'QueryTypes',
  description: 'QueryTypes',
  fields: {
    memberTypes: {
      type: memberTypeList,
      resolve: () => new Promise((resolve) => {
        void PrismaClientUtil.memberType.findMany()
        .then((memberTypes) => {
        resolve(memberTypes);
        })
      }),
    },

    posts: {
      type: postTypeList,
      resolve: () => new Promise((resolve) => {
        void PrismaClientUtil.post.findMany()
        .then((posts) => {
        resolve(posts);
        })
      }),
    },

    users: {
      type: userTypeList,
      resolve: () => new Promise((resolve) => {
        void PrismaClientUtil.user.findMany()
        .then((users) => {
        resolve(users);
        })
      }),
    },
    
    profiles: {
      type: ProfileTypeList,
      resolve: () => new Promise((resolve) => {
        void PrismaClientUtil.profile.findMany()
        .then((profiles) => {
        resolve(profiles);
        })
      }),
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
      resolve: (_root, { id }: { id: MemberTypeId }) => new Promise((resolve) => {
        void PrismaClientUtil.memberType.findUnique({ where: { id } })
        .then((memberType) => {
        resolve(memberType);
        })
      }),
    },

    post: {
      type: <GraphQLOutputType> PostType,
      args: { id: { type: UUIDType } },
      resolve: (_root, { id }: { id: string }) => new Promise((resolve) => {
        void PrismaClientUtil.post.findUnique({ where: { id } })
        .then((post) => {
        resolve(post);
        })
      }),
    },
    
    user: {
    type: <GraphQLOutputType> UserType,
    args: { id: { type: UUIDType } },
    resolve: (_root, { id }: { id: string }) => new Promise((resolve) => {
        void PrismaClientUtil.user.findUnique({ where: { id } })
        .then((user) => {
        resolve(user);
        })
      }),
    },
    
    profile: {
    type: <GraphQLOutputType> ProfileType,
    args: { id: { type: UUIDType } },
    resolve: (_root, { id }: { id: string }) => new Promise((resolve) => {
        void PrismaClientUtil.profile.findUnique({ where: { id } })
        .then((profile) => {
        resolve(profile);
        })
      }),
    },
  },
});
