import { NextApiRequest, NextApiResponse } from "next";
import { generateMainImage } from "@/utils/image.server";
import { BannerImageInput } from "@/models/banner";

const twitter = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    if (req.method !== "POST") {
      res.status(404).end();
      return;
    }
    console.log(req.body);
    const bannerInput: BannerImageInput = req.body;

    const image = await generateMainImage(bannerInput);
    res.writeHead(200, { "Content-Type": "image/png" });
    res.end(image, "binary");
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};
export default twitter;
