export const parseJwt = (
  token: string
): { userId: string; session: string } => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};
