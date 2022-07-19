import { AppwriteRequest, AppwriteResponse } from "../../models/general";
import { Client, Account } from "node-appwrite";
import { getOAuthRequestToken } from "../../utils/twitter";

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - object with request body data
    'env' - object with environment variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req: AppwriteRequest, res: AppwriteResponse) {
  const client = new Client();

  // // You can remove services you don't use
  let account = new Account(client);
  // let avatars = new Avatars(client);
  // let database = new Databases(client, "YOUR_DATABASE_ID");
  // let functions = new Functions(client);
  // let health = new Health(client);
  // let locale = new Locale(client);
  // let storage = new Storage(client);
  // let teams = new Teams(client);
  // let users = new Users(client);

  if (
    !req.env["APPWRITE_FUNCTION_ENDPOINT"] ||
    !req.env["APPWRITE_FUNCTION_API_KEY"] ||
    !req.env["APPWRITE_FUNCTION_PROJECT_ID"]
  ) {
    console.warn(
      "Environment variables are not set. Function cannot use Appwrite SDK."
    );
    res.send(
      "Environment variables are not set. Function cannot use Appwrite SDK",
      401
    );
    return;
  }

  if (!req.env["APPWRITE_FUNCTION_JWT"]) {
    console.warn("missing JWT");
    res.send("missing JWT", 401);
    return;
  }

  client
    .setEndpoint(req.env["APPWRITE_FUNCTION_ENDPOINT"])
    .setProject(req.env["APPWRITE_FUNCTION_PROJECT_ID"])
    // .setKey(req.env["APPWRITE_FUNCTION_API_KEY"])
    .setJWT(req.env["APPWRITE_FUNCTION_JWT"]);

  getOAuthRequestToken(req, res);

  try {
    console.log("Getting User");
    const user = await account.get();
    console.log("user found", user);
    // getOAuthRequestToken(req, res);
  } catch (error: any) {
    console.log(error);
    res.send(error, 500);
  }
};
