import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("http://localhost/v1") // Your API Endpoint
  .setProject("64337dba7847885ca190"); // Your project ID

export const account = new Account(client);