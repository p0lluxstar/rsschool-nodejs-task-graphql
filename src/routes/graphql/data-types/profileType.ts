import { GraphQLBoolean, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLOutputType } from "graphql";
import { MemberType} from "./memberType.js";
import { UUIDType } from '../types/uuid.js';
import { PrismaClientUtils } from "../utils/prismaClientUtils.js";
import { UserType } from "./userType.js";

export interface InterfaceProfileType {
    id: string;
    isMale: boolean;
    yearOfBirth: number;
    userId: string;
    /* user?: IUser; */
    memberTypeId: string;
    /* memberType?: IMemberType; */
  }

export const ProfileType = new GraphQLObjectType<InterfaceProfileType>({
    name: 'ProfileType',
    description: 'ProfileType',
    fields: () => ({
      id: { type: UUIDType },
      isMale: { type: GraphQLBoolean },
      yearOfBirth: { type: GraphQLInt },
      userId: { type: GraphQLString },
      user: { type: new GraphQLList(UserType) },
      memberTypeId:  {
        type: GraphQLString,
        enumValues: ['basic', 'business'],
        },
      memberType: {
        type: MemberType as GraphQLOutputType,
        resolve: async ({ memberTypeId }: InterfaceProfileType) =>
          await PrismaClientUtils.memberType.findFirst({ where: { id: memberTypeId } }),
      },
    }),
  });