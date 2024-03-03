import { GraphQLString, GraphQLObjectType, GraphQLOutputType } from "graphql";
import { UserType } from "./userType.js";
import { UUIDType } from '../types/uuid.js';

export interface InterfacePost {
    id: string;
    title: string;
    content: string;
    authorId: string;
    /* author?: IUser; */
  }

export const PostType = new GraphQLObjectType<InterfacePost>({
    name: 'PostType',
    description: 'PostType',
    fields: () => ({
      id: { type: UUIDType },
      title: { type: GraphQLString },
      content: { type: GraphQLString },
      authorId: { type: GraphQLString },
      author: { type: <GraphQLOutputType> UserType},
    }),
  });