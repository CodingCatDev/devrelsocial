import { NextApiRequest, NextApiResponse } from "next";

export const parseJwt = (
  token: string
): { userId: string; session: string } => {
  console.log("parsing token", token);
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

export const getUserIdFromJwt = ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const jwt = req?.query?.jwt;

  if (!jwt) {
    res.redirect(`${req.headers.referer}?failed=true`);
  }
  const parsedJwt = parseJwt(jwt as string);
  if (!parseJwt || !parsedJwt?.userId) {
    res.redirect(`${req.headers.referer}?failed=true`);
  }
  return parsedJwt.userId;
};
