import { Query } from "node-appwrite";
import { NextApiRequest, NextApiResponse } from "next";
import { OAuth } from "oauth";
import * as nodeUrl from "url";
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
    "devrel-social-main",
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
    "devrel-social-main",
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

const oa = new OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  config.twitterApiKey,
  config.twitterApiSecret,
  "1.0A",
  `${
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://devrelsocial"
  }/api/twitter/callback`,
  "HMAC-SHA1"
);

export const getOAuthRequestToken = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // Validate user
  const jwt = req?.query?.jwt;
  if (!jwt) {
    res.redirect(`${req.headers.referer}?failed=true`);
  }
  const parsedJwt = parseJwt(jwt as string);
  if (!parseJwt || !parsedJwt?.userId) {
    res.redirect(`${req.headers.referer}?failed=true`);
  }
  oa.getOAuthRequestToken(async function (
    error,
    oAuthToken,
    oAuthTokenSecret,
    results
  ) {
    if (error) {
      console.error('Error: getOAuthRequestToken', error);
      res.end(
        JSON.stringify({
          message: "getOAuthRequestToken: Error occured while getting access token",
          error: error,
        })
      );
      return;
    }

    if (!req || !req?.url) {
      return;
    }
    try {
      await databases.updateDocument(
        "devrel-social-main",
        "users",
        parsedJwt.userId,
        {
          oAuthToken,
          redirect: req.headers.referer,
        }
      );
    } catch (error) {
      try {
        await databases.createDocument(
          "devrel-social-main",
          "users",
          parsedJwt.userId,
          {
            oAuthToken,
            redirect: req.headers.referer,
          }
        );
      } catch (error) {
        console.error(error);
        res.end(
          JSON.stringify({
            message: "getOAuthRequestToken: Error occured while creating user in database",
            error: error,
          })
        );
        return;
      }
    }

    return res.redirect(
      "https://twitter.com/" + "oauth/authorize?oauth_token=" + oAuthToken
    );
  });
};

export const getOAuthAccessToken = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  oa.getOAuthRequestToken(function (
    error,
    oAuthToken,
    oAuthTokenSecret,
    results
  ) {
    if (error) {
      console.error(error);
      res.end(
        JSON.stringify({
          message: "getOAuthAccessToken: Error occured while getting access token",
          error: error,
        })
      );
      return;
    }
    const urlObj = nodeUrl.parse(req.url as string, true);
    oa.getOAuthAccessToken(
      urlObj.query.oauth_token as string,
      oAuthTokenSecret,
      urlObj.query.oauth_verifier as string,
      async (error, oAuthAccessToken, oAuthAccessTokenSecret, results) => {
        if (error) {
          console.error(error);
          res.end(
            JSON.stringify({
              message: "getOAuthAccessToken2: Error occured while getting access token",
              error: error,
            })
          );
          return;
        }

        try {
          const users = await databases.listDocuments<any>(
            "devrel-social-main",
            "users",
            [Query.equal("oAuthToken", [urlObj.query.oauth_token as string])]
          );
          const original = users?.documents?.at(0);

          if (!original || !original?.$id) {
            res.end(
              JSON.stringify({
                message: "No User Found",
                error: error,
              })
            );
            return;
          }

          await databases.updateDocument(
            "devrel-social-main",
            "users",
            original?.$id,
            {
              oAuthAccessToken,
              oAuthAccessTokenSecret,
            }
          );
          console.log("redirect", original.redirect);
          res.redirect(original.redirect);
        } catch (error) {
          console.error(error);
          res.end(
            JSON.stringify({
              message: "getOAuthAccessToken2: Error occured while creating user in database",
              error: error,
            })
          );
          return;
        }
      }
    );
  });
};
