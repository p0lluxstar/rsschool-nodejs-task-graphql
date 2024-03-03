import { GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLOutputType } from "graphql";
import { PrismaClientUtils } from "../utils/prismaClientUtils.js";
import { UUIDType } from '../types/uuid.js';
import { ProfileType } from "./profileType.js";
import { PostType } from "./postType.js";

export interface InterfaceUser {
    id: string;
    name: string;
    balance: number;
/*     profile?: IProfile;
    posts?: IPost[];
    userSubscribedTo?: ISubscribersOnAuthors[];
    subscribedToUser?: ISubscribersOnAuthors[]; */
  }

export const UserType = new GraphQLObjectType<InterfaceUser>({
    name: 'UserType',
    description: 'UserType',
    fields: () => ({
      id: { type: UUIDType },
      name: { type: GraphQLString },
      balance: { type: GraphQLFloat },
      profile: {
        type: ProfileType as GraphQLOutputType,
        resolve: async ({ id }: InterfaceUser) =>
          await PrismaClientUtils.profile.findFirst({ where: { userId: id } }),
      },
  
       posts: {
        type: new GraphQLList(PostType),
        resolve: async ({ id }: InterfaceUser) =>
          await PrismaClientUtils.post.findMany({ where: { authorId: id } }),
      }, 
  
       userSubscribedTo: {
        type: new GraphQLList(UserType),
        resolve: async ({ id }: InterfaceUser) => {
          const data = await PrismaClientUtils.subscribersOnAuthors.findMany({
            where: { subscriberId: id },
            select: { author: true },
          });
          return data.map(({ author }) => author);
        },
      }, 
  
       subscribedToUser: {
        type: new GraphQLList(UserType),
        resolve: async ({ id }: InterfaceUser) => {
          const data = await PrismaClientUtils.subscribersOnAuthors.findMany({
            where: { authorId: id },
            select: { subscriber: true },
          });
          return data.map(({ subscriber }) => subscriber);
        },
      }, 
    }),
  });