import { GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLOutputType } from "graphql";
import { PrismaClientUtils } from "../utils/prismaClientUtils.js";
import { UUIDType } from '../types/uuid.js';
import ProfileType from "./profileType.js";

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
    name: 'User',
    fields: () => ({
      id: { type: UUIDType },
      name: { type: GraphQLString },
      balance: { type: GraphQLFloat },
      profile: {
        type: ProfileType as GraphQLOutputType,
        resolve: async ({ id }: InterfaceUser) =>
          await PrismaClientUtils.profile.findFirst({ where: { userId: id } }),
      },
  
  /*     posts: {
        type: new GraphQLList(PostType),
        resolve: async ({ id }: IUser) =>
          await prisma.post.findMany({ where: { authorId: id } }),
      }, */
  
   /*    userSubscribedTo: {
        type: new GraphQLList(UserType),
        resolve: async ({ id }: IUser) => {
          const data = await prisma.subscribersOnAuthors.findMany({
            where: { subscriberId: id },
            select: { author: true },
          });
          return data.map(({ author }) => author);
        },
      }, */
  
     /*  subscribedToUser: {
        type: new GraphQLList(UserType),
        resolve: async ({ id }: IUser) => {
          const data = await prisma.subscribersOnAuthors.findMany({
            where: { authorId: id },
            select: { subscriber: true },
          });
          return data.map(({ subscriber }) => subscriber);
        },
      }, */
    }),
  });