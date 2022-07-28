if (!process.env.TWITTER_API_KEY || !process.env.TWITTER_API_SECRET) {
  throw new Error("Missing Twitter consumer key");
}

export const config = {
  twitterApiKey: process.env.TWITTER_API_KEY || "",
  twitterApiSecret: process.env.TWITTER_API_SECRET || "",
};
