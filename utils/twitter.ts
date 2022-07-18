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
    console.log("urlObj", urlObj);

    res.redirect(
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
    console.log("urlObj", urlObj);

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
