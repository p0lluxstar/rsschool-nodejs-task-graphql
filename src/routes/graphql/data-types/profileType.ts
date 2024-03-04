import { GraphQLBoolean, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLOutputType } from "graphql";
import { MemberType} from "./memberType.js";
import { UUIDType } from '../types/uuid.js';
import { PrismaClientUtil } from "../utils/prismaClientUtils.js";
import { UserType } from "./userType.js";

interface InterfaceProfileType {
    id: string;
    isMale: boolean;
    yearOfBirth: number;
    userId: string;
    memberTypeId: string;
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
        memberTypeId: {
        type: GraphQLString,
        enumValues: ['basic', 'business'],
        },
        memberType: {
        type: <GraphQLOutputType> MemberType,
        resolve: ({ memberTypeId }: InterfaceProfileType) => {
            return new Promise((resolve, reject) => {
                PrismaClientUtil.memberType.findFirst({ where: { id: memberTypeId } })
                    .then((result) => resolve(result))
                    .catch((error) => reject(error));
            });
        }
        },
    }),
});