import { getOAuthAccessToken } from "@/utils/twitter.server";
import { NextApiRequest, NextApiResponse } from "next";

const twitter = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await getOAuthAccessToken(req, res);
};
export default twitter;
