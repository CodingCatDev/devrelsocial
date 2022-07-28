import { Models } from "node-appwrite";

export interface User extends Models.Document {
  oAuthToken: string;
  oAuthAccessToken: string;
  oAuthAccessTokenSecret: string;
  redirect: string;
}
