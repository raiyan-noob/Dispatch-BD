import { betterAuth } from "better-auth";
import { setServers } from "node:dns";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

setServers(["1.1.1.1", "8.8.8.8"]);

let authInstance;

export function getAuth() {
  if (authInstance) {
    return authInstance;
  }

  const mongodbUrl = process.env.MONGODB_URL;
  if (!mongodbUrl) {
    throw new Error(
      "MONGODB_URL is not configured. Add it to the deployment environment before using authentication."
    );
  }

  const client = new MongoClient(mongodbUrl);
  const db = client.db("Dispatch-BD");

  authInstance = betterAuth({
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    },
    database: mongodbAdapter(db, {
      client,
    }),
  });

  return authInstance;
}