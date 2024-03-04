import { GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLOutputType } from "graphql";
import { PrismaClientUtil } from "../utils/prismaClientUtils.js";
import { UUIDType } from '../types/uuid.js';
import { ProfileType } from "./profileType.js";
import { PostType } from "./postType.js";

interface InterfaceUser {
    id: string;
    name: string;
    balance: number;
}

const postTypeList = new GraphQLList(PostType);

export const UserType = new GraphQLObjectType<InterfaceUser>({

    name: 'UserType',
    description: 'UserType',
    fields: () => ({
      id: { type: UUIDType },
      name: { type: GraphQLString },
      balance: { type: GraphQLFloat },
      profile: {
        type: <GraphQLOutputType> ProfileType,
        resolve: ({ id }: InterfaceUser) => PrismaClientUtil.profile
        .findFirst({ where: { userId: id } })
        .then(result => {
            return result;
        }),
      },
  
       posts: {
        type: postTypeList,
        resolve: ({ id }: InterfaceUser) => PrismaClientUtil.post
        .findMany({ where: { authorId: id } })
        .then(result => {
            return result;
        }),
      }, 
  
       userSubscribedTo: {
        type: new GraphQLList(UserType),
        resolve: async ({ id }: InterfaceUser) => await PrismaClientUtil.subscribersOnAuthors
        .findMany({
          where: { subscriberId: id },
          select: { author: true },
        })
        .then(data => data.map(({author}) => author)),
      }, 
  
       subscribedToUser: {
        type: new GraphQLList(UserType),
        resolve: async ({ id }: InterfaceUser) => await PrismaClientUtil.subscribersOnAuthors
        .findMany({
            where: { authorId: id },
            select: { subscriber: true },
        })
        .then(data => data.map(({ subscriber }) => subscriber)),
      }, 
    }),
  });