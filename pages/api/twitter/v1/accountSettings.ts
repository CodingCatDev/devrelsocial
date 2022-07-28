import { TwitterApi } from "twitter-api-v2";
import { parseJwt } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { databases } from "@/utils/appwrite.databases.server";
import { User } from "@/models/user";
import { config } from "@/config/twitter";

const twitter = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    // Validate user
    const jwt = req?.query?.jwt;
    if (!jwt) {
      res.redirect(`${req.headers.referer}?failed=true`);
    }
    const parsedJwt = parseJwt(jwt as string);
    if (!parseJwt || !parsedJwt?.userId) {
      res.redirect(`${req.headers.referer}?failed=true`);
    }

    const user = await databases.getDocument<User>("users", parsedJwt.userId);
    const twitterClient = new TwitterApi({
      appKey: config.twitterApiKey,
      appSecret: config.twitterApiSecret,
      accessToken: user.oAuthAccessToken,
      accessSecret: user.oAuthAccessTokenSecret,
    });
    const roClient = twitterClient.readOnly;
    res.status(200).json(await roClient.v1.verifyCredentials());
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
export default twitter;
