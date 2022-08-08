import { NextApiRequest, NextApiResponse } from "next";
import { getUserIdFromJwt, parseJwt } from "@/utils/auth";
import { config } from "@/config/twitter";
import { TwitterApi } from "twitter-api-v2";
import { User } from "@/models/user";
import { databases } from "@/utils/appwrite.databases.server";

export const getReadOnlyClient = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const user = await databases.getDocument<User>(
    "users",
    await getUserIdFromJwt({ req, res })
  );
  if (!user) {
    res.status(401).json("User Not Found");
  }
  const twitterClient = new TwitterApi({
    appKey: config.twitterApiKey,
    appSecret: config.twitterApiSecret,
    accessToken: user.oAuthAccessToken,
    accessSecret: user.oAuthAccessTokenSecret,
  });
  return twitterClient.readOnly;
};

export const getReadWriteClient = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const user = await databases.getDocument<User>(
    "users",
    await getUserIdFromJwt({ req, res })
  );
  if (!user) {
    res.status(401).json("User Not Found");
  }
  const twitterClient = new TwitterApi({
    appKey: config.twitterApiKey,
    appSecret: config.twitterApiSecret,
    accessToken: user.oAuthAccessToken,
    accessSecret: user.oAuthAccessTokenSecret,
  });
  return twitterClient.readWrite;
};
