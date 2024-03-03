import { GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLOutputType } from "graphql";
import { PrismaClientUtil } from "../utils/prismaClientUtils.js";
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
        resolve: async ({ id }: InterfaceUser) => await PrismaClientUtil.profile.findFirst({ where: { userId: id } }),
      },
  
       posts: {
        type: postTypeList,
        resolve: async ({ id }: InterfaceUser) => await PrismaClientUtil.post.findMany({ where: { authorId: id } }),
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