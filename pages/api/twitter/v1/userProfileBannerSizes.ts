import { getUserIdFromJwt } from "@/utils/auth";
import { getReadOnlyClient } from "@/utils/twitter.server";
import { NextApiRequest, NextApiResponse } from "next";

const twitter = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const roClient = await getReadOnlyClient({ req, res });
    const twitterUser = await roClient.v1.verifyCredentials();
    res.status(200).json(
      await roClient.v1.userProfileBannerSizes({
        user_id: twitterUser.id_str,
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
export default twitter;
