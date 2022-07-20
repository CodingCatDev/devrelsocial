export const config = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_END_POINT || "",
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "",
  auth0BaseURL: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL || "",
  keySecret: process.env.APPWRITE_KEY_SECRET || "",
};
