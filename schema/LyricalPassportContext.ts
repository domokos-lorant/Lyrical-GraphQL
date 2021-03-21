import { Request } from "express";
import { PassportContext } from "graphql-passport";
import { UserAttributes } from "../server/models/user";

export interface LyricalPassportContext extends PassportContext<UserAttributes, UserAttributes, {}, Request> { }