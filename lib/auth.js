import { betterAuth } from "better-auth";
import { setServers } from "node:dns";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

setServers(["1.1.1.1", "8.8.8.8"]);

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db("Dispatch-BD");

export const auth = betterAuth({
     emailAndPassword: { 
    enabled: true, 
  },
  database: mongodbAdapter(db, {
    client,
  }),
});