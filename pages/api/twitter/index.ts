import { getOAuthRequestToken } from "@/utils/twitter";
import { NextApiRequest, NextApiResponse } from "next";

const twitter = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  console.log(req.query);
  getOAuthRequestToken(req, res);
};
export default twitter;
