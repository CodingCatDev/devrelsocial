import { Query } from "node-appwrite";
import { parseJwt } from "@/utils/auth";
import { databases } from "@/utils/appwrite.databases.server";
import { NextApiRequest, NextApiResponse } from "next";
import { OAuth } from "oauth";
import * as nodeUrl from "url";

if (!process.env.TWITTER_API_KEY || !process.env.TWITTER_API_SECRET) {
  throw new Error("Missing Twitter consumer key");
}

const oa = new OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  process.env.TWITTER_API_KEY,
  process.env.TWITTER_API_SECRET,
  "1.0A",
  null,
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
      console.error(error);
      res.end(
        JSON.stringify({
          message: "Error occured while getting access token",
          error: error,
        })
      );
      return;
    }

    if (!req || !req?.url) {
      return;
    }

    try {
      await databases.getDocument("users", parsedJwt.userId);
      await databases.updateDocument("users", parsedJwt.userId, {
        oAuthToken,
        redirect: req.headers.referer,
      });
    } catch (error) {
      try {
        await databases.createDocument("users", parsedJwt.userId, {
          oAuthToken,
        });
      } catch (error) {
        console.error(error);
        res.end(
          JSON.stringify({
            message: "Error occured while creating user in database",
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
          message: "Error occured while getting access token",
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
              message: "Error occured while getting access token",
              error: error,
            })
          );
          return;
        }

        try {
          const users = await databases.listDocuments<any>(
            "users",
            [Query.equal("oAuthToken", urlObj.query.oauth_token as string)],
            1
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
          await databases.updateDocument("users", original?.$id, {
            oAuthAccessToken,
            oAuthAccessTokenSecret,
          });
          console.log("redirect", original.redirect);
          res.redirect(original.redirect);
        } catch (error) {
          console.error(error);
          res.end(
            JSON.stringify({
              message: "Error occured while creating user in database",
              error: error,
            })
          );
          return;
        }
      }
    );
  });
};
