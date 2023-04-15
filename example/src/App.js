import { useState, useEffect } from "react";
import {account} from "./config/appwrite"
import AppwriteAuth from "appwrite-authui-react";
import "appwrite-authui-react/dist/index.css";
import "./App.css";

function App() {

  const [user, setUser] = useState()
  useEffect(() => {
    async function checkExistingUser() {
      try {
        const promise = await account.get()
        setUser(promise)
      } catch (error) {
        setUser(null)
      }
    }
    checkExistingUser()
  }, [])

  const onClick = () => {
    account.deleteSessions();
    setUser(null);
  }

  return (
    <div className="App">
      <header>DEMO APP</header>
      {
        (!user) ? (
          <AppwriteAuth
            appwriteAccount={account}
            authOptions={{
              email: true,
              phone: true,
              magicurl: true,
              anonymous: true,
              oauth: ["google", "github"],
            }}
          />
        ):(
          <div class="userDetails">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <button onClick={onClick}>Logout</button>
          </div>
        )
      }
    </div>
  );
}

export default App;
