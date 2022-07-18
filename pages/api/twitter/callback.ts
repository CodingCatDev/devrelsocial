import { getOAuthAccessToken } from "@/utils/twitter";
import { NextApiRequest, NextApiResponse } from "next";

const twitter = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const token = await getOAuthAccessToken(req, res);
};
export default twitter;
