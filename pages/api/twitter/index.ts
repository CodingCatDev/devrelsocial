import { getOAuthRequestToken } from "@/utils/twitter";
import { NextApiRequest, NextApiResponse } from "next";

const twitter = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  getOAuthRequestToken(req, res);
};
export default twitter;
