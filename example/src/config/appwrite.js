import { Client, Account} from 'appwrite';

//creating appwrite client
const client = new Client()
    .setEndpoint('https://[HOSTNAME_OR_IP]/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2');               // Your project ID

//configuring appwrite account
export const account = new Account(client);