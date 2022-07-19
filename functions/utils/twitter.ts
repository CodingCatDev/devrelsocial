// import { AppwriteRequest, AppwriteResponse } from "../models/general";

import { OAuth } from "oauth";
import * as nodeUrl from "url";

export const getOAuthRequestToken = async (req: any, res: any) => {
  if (!req.env.TWITTER_API_KEY || !req.env.TWITTER_API_SECRET) {
    throw new Error("Missing Twitter consumer key");
  }

  const oa = new OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    req.env.TWITTER_API_KEY,
    req.env.TWITTER_API_SECRET,
    "1.0A",
    null,
    "HMAC-SHA1"
  );

  oa.getOAuthRequestToken(function (
    error,
    oAuthToken,
    oAuthTokenSecret,
    results
  ) {
    if (error) {
      console.log(error);
      res.end(
        JSON.stringify({
          message: "Error occured while getting access token",
          error: error,
        })
      );
      return;
    }
    res.redirect(
      "https://twitter.com/" + "oauth/authorize?oauth_token=" + oAuthToken
    );
  });
};

export const getOAuthAccessToken = (req: any, res: any) => {
  if (!req.env.TWITTER_API_KEY || !req.env.TWITTER_API_SECRET) {
    throw new Error("Missing Twitter consumer key");
  }

  const oa = new OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    req.env.TWITTER_API_KEY,
    req.env.TWITTER_API_SECRET,
    "1.0A",
    null,
    "HMAC-SHA1"
  );
  oa.getOAuthRequestToken(function (
    error,
    oAuthToken,
    oAuthTokenSecret,
    results
  ) {
    if (error) {
      console.log(error);
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
      (error, oAuthAccessToken, oAuthAccessTokenSecret, results) => {
        if (error) {
          console.log(error);
          res.end(
            JSON.stringify({
              message: "Error occured while getting access token",
              error: error,
            })
          );
          return;
        }

        return {
          oAuthAccessToken,
          oAuthAccessTokenSecret,
        };
      }
    );
  });
};
