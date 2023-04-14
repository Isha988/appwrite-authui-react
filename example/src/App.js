import React, { useState, useEffect } from 'react'
import { account } from './config/appwrite'

import AppwriteAuth from 'appwrite-authui-react'
import 'appwrite-authui-react/dist/index.css'

const App = () => {
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

  return (
    <>
      <header>Demo App</header>
      {!user ? (
        <AppwriteAuth
          appwriteAccount={account}
          authOptions={{
            phone: true,
            anonymous: true,
            magicurl: true,
            oauth: ['google', 'github'],
            email: true
          }}
        />
      ) : (
        <div class="userDetails">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>{user.status}</p>
          <button
            onClick={() => {
              account.deleteSessions()
              setUser(null)
            }}
          >
            logout
          </button>
        </div>
      )}
    </>
  )
}

export default App
