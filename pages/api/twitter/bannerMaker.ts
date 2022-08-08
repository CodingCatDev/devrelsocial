import { NextApiRequest, NextApiResponse } from "next";
import { generateMainImage } from "@/utils/image.server";

const twitter = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const image = await generateMainImage({
      articleName: "testing",
      articleCategory: "something",
      emoji: "😃",
    });
    res.writeHead(200, { "Content-Type": "image/png" });
    res.end(image, "binary");
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};
export default twitter;
