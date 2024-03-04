import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLOutputType } from "graphql";
import { UUIDType } from "../types/uuid.js";
import { UserType } from "./userType.js";

interface InterfaceSubOnAuthors {
    subscriberId: string;
    authorId: string;
}

export const SubOnAuthorsType = new GraphQLObjectType<InterfaceSubOnAuthors>({
    name: 'SubOnAuthorsType',
    description: 'SubOnAuthorsType',
    fields: {
        id: { type: UUIDType },
        authorId: { type: new GraphQLNonNull(UUIDType) },
        subscriber: { type: new GraphQLList(UserType) },
        author: { type: UserType as GraphQLOutputType }
    }
});