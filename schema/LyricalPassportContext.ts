import { Request } from "express";
import { PassportContext } from "graphql-passport";
import { UserAttributes, UserDocument } from "../server/models/user";

export interface LyricalPassportContext extends PassportContext<UserDocument, UserAttributes, {}, Request> { }