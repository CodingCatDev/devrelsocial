import { getReadOnlyClient } from "@/utils/twitter.server";
import { NextApiRequest, NextApiResponse } from "next";

const twitter = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    // Validate user
    const roClient = await getReadOnlyClient({ req, res });
    res.status(200).json(await roClient.v1.verifyCredentials());
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
export default twitter;
