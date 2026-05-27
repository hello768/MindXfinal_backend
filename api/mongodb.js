import { MongoClient, ServerApiVersion } from 'mongodb';

const USERNAME = process.env.MDB_USERNAME;
const PASSWORD = process.env.MDB_PASSWORD;
const URL = process.env.MDB_URL;

const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@${URL}/?appName=vartija-backend`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const Client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  }
});

export default Client;