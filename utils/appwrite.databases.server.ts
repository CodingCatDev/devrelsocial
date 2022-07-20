import { Client, Databases } from "node-appwrite";
import { config } from "@/config/appwrite";
// Init SDK
const client = new Client();
const db = new Databases(client, "devrel-social-main");

client
  .setEndpoint(config.endpoint) // Your API Endpoint
  .setProject(config.projectId) // Your project ID
  .setKey(config.keySecret);
export const databases = db;
