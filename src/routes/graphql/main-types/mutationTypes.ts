import { GraphQLNonNull, GraphQLBoolean, GraphQLObjectType } from 'graphql';
import { crtPostType } from '../data-types/crtPostType.js';
import { crtUserType } from '../data-types/crtUserType.js';
import { crtProfileType } from '../data-types/crtProfileType.js';
import { chnPostType } from '../data-types/chnPostType.js';
import { chnUserType } from '../data-types/chnUserType.js';
import { chnProfileType } from '../data-types/chnProfileType.js';
import { PrismaClientUtil } from '../utils/prismaClientUtils.js';
import { PostType } from '../data-types/postType.js';
import { UserType } from '../data-types/userType.js';
import { SubOnAuthorsType } from '../data-types/subOnAuthorsType.js';
import { UUIDType } from '../types/uuid.js';
import { Prisma } from '@prisma/client';

export const MutationTypes = new GraphQLObjectType({
  name: 'MutationTypes',
  description: 'MutationTypes',
  fields: () => ({

    createUser: {
      type: UserType as GraphQLObjectType,
      args: { dto: { type: crtUserType } },
      resolve: (_root, { dto }: { dto: Prisma.UserCreateInput }) => {
          return new Promise((resolve) => {
          void PrismaClientUtil.user
          .create({ data: dto })
          .then((newUser) => {
          resolve(newUser);
          })
        });
      },
    },

    createPost: {
      type: PostType,
      args: { dto: { type: crtPostType } },
      resolve: (_root, { dto }: { dto: Prisma.PostCreateInput }) => {
        return new Promise((resolve) => {
          void PrismaClientUtil.post
          .create({ data: dto })
          .then((data) => {
          resolve(data);
          })
        });
      },
    },

    createProfile: {
      type: PostType,
      args: { dto: { type: crtProfileType } },
        resolve: (_root, { dto }: { dto: Prisma.ProfileUncheckedCreateInput }) => {
          return new Promise((resolve) => {
          void PrismaClientUtil.profile
          .create({ data: dto })
          .then((newUser) => {
          resolve(newUser);
          })
        });
      },
    },

    deleteUser: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: (_root, { id }: { id: string }) => {
      return new Promise((resolve) => {
        PrismaClientUtil.user
        .delete({ where: { id } })
        .then(() => {
        resolve(true);
        })
        .catch(() => {
        resolve(false);
        });
        });
      },
    },

    deletePost: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_root, args: Prisma.PostWhereUniqueInput) => {
        try {
          await PrismaClientUtil.post.delete({ where: args });
          return true;
        } catch {
          return false;
        }
      },
    },

    deleteProfile: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_root, { id }: { id: string }) => {
      return new Promise((resolve) => {
        PrismaClientUtil.profile
        .delete({ where: { id } })
        .then(() => {
        resolve(true);
        })
        .catch(() => {
        resolve(false);
        });
        });
      },
    },

    changeUser: {
      type: UserType as GraphQLObjectType,
      args: { dto: { type: chnUserType }, id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (
      _root,
      { id, dto }: { dto: Prisma.UserUpdateInput; id: string },
      ) => {
        return new Promise((resolve) => {
          PrismaClientUtil.user
          .update({ where: { id }, data: dto })
          .then((updatedUser) => {
          resolve(updatedUser);
          })
          .catch(() => {
          resolve(null);
          });
        });
      },
    },

    changePost: {
      type: PostType as GraphQLObjectType,
      args: { dto: { type: chnPostType }, id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: (_root, { id, dto }: { dto: Prisma.PostUpdateInput; id: string }) => {
        return new Promise((resolve, reject) => {
          PrismaClientUtil.post.update({ where: { id }, data: dto })
          .then((updatedPost) => resolve(updatedPost))
          .catch((error) => reject(error));
        });
      },
    },

    changeProfile: {
      type: PostType as GraphQLObjectType,
      args: {
      dto: { type: chnProfileType },
      id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: (_root, { id, dto }: { dto: Prisma.ProfileUpdateInput; id: string }) => {
        return new Promise((resolve, reject) => {
          PrismaClientUtil.profile.update({ where: { id }, data: dto })
          .then((updatedProfile) => {
          resolve(updatedProfile);
          })
          .catch((error) => {
          reject(error);
          });
          });
        },
    },

    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: (_root, { userId, authorId }: { userId: string; authorId: string }) => {
        return new Promise((resolve, reject) => {
          PrismaClientUtil.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
            subscriberId: userId,
            authorId: authorId,
            },
          },
          }).then(() => {
          resolve(true);
          }).catch((error) => {
          reject(error);
          });
        });
      },
    },

    subscribeTo: {
      type: SubOnAuthorsType,
      args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: (_root, { userId, authorId }: { userId: string; authorId: string }) => {
        return new Promise((resolve, reject) => {
          PrismaClientUtil.subscribersOnAuthors.create({ data: { subscriberId: userId, authorId } })
          .then((subscription) => {
          resolve(subscription);
          })
          .catch((error) => {
          reject(error);
          });
        });
      },
    },
  }),
});
