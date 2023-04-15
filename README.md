![React-Appwrite-Authui Component Library(2)](https://user-images.githubusercontent.com/89572340/232035417-d37c3b0c-e814-4dfd-b124-b782753514ed.png)

# Appwrite Authui React

[![NPM](https://img.shields.io/npm/v/appwrite-authui-react.svg)](https://www.npmjs.com/package/appwrite-authui-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Appwrite AuthUI React is a UI helper library for React.js which provides customizable and beautiful UI that make the implementation of appwrite authentication easier and simpler. It is built upon the top of [Appwrite Auth](https://appwrite.io/docs/authentication)

It can implement all authentication method including email&password, magicurl, phone, anonymous and OAuth and give independence to use all or some of them.

It also provides password recovery (forgot password) feature.

It also have resend link and resend recret feature in case user don't get the link, which makes it veru user friendly.

It provides great error handling and form validations feature.

## Table of Contents

1. [Demo](#demo)
2. [Installation](#install)
3. [Usage](#usage)
   1. [Configuration](#configuration)
   2. [Adding AppwriteAuth Component](#adding-appwriteauth-component)
4. [More Details for authOptions parameter](#more-details-for-authoptions-parameter)
5. [Using AppwriteAuth with redirect](#using-appwriteauth-with-redirect)
6. [Using AppwriteAuth with local state](#using-appwriteauth-with-local-state)
7. [Changing color theme of AppwriteAuth Component](#changing-color-theme-of-appwriteauth-component)

## Demo

For a video demonstration of the library visit [video link](https://drive.google.com/file/d/1SRO04FOeM0v4XhHu2zMuPHqMTNhF1KEi/view?usp=sharing)

For an example on how to use the Appwrite AuthUI React have a look at the [example](https://github.com/Isha988/appwrite-authui-react/tree/main/example) folder.

![Screenshot 2023-04-14 at 08-04-39 react-appwrite-authui](https://user-images.githubusercontent.com/89572340/232185337-e79b5e95-ca75-4017-a9ef-cc86b07dc6fa.png)

## Install

Install the appwrite-authui-react npm package in your app via npm using following command

```bash
npm install --save appwrite-authui-react
```

You also need to install peer dependencies <mark>appwrite</mark> and <mark>simple-react-validator</mark>

```bash
npm install appwrite simple-react-validator --save
```

You can then import the following modules within your source file

```jsx
import { Client, Account } from 'appwrite'

import AppwriteAuth from 'appwrite-authui-react'
import 'appwrite-authui-react/dist/index.css'
```

## Usage

Appwrite AuthUI React includes the following flows:

1. Interaction with OAuth Providers such as Google and GitHub
2. Sign Up and Sign In using emailand password
3. Forgot Password
4. Authentication using Magic URL(email link)
5. Phone number based authentication
6. Anonymous Sign In or continue as guest

### Configuration

Before getting started with the Appwrite AuthUI React you need to make some configuration based on the different authentication flows

#### 1. Appwrite account configuration (Required for all authentication methods)

Appwrite account configuration is required for all the authentication methods

This can be done as follow

```jsx
import { Client, Account } from 'appwrite'

const client = new Client()
  .setEndpoint('https://[HOSTNAME_OR_IP]/v1') // Your API Endpoint
  .setProject('[project ID]') // Your project ID

const account = new Account(client)
```

For more deatils visit:

1. https://appwrite.io/docs/installation (Installation of Appwrite)
2. https://appwrite.io/docs/getting-started-for-web (Creating and configuring project in appwrite console)

#### 2. SMS Provider Configuartion (Required for Phone number authentication)

If you are using phone number authentication in your application you need to configure a SMS provider which can delivery sms for you.

For this purpose any one among the following can be used:

1. Twilio
2. TextMagic
3. TeleSign
4. MSG91
5. Vonage

For more deatils visit:

1. https://appwrite.io/docs/sms-delivery
2. https://dev.to/appwrite/phone-authentication-with-appwrite-and-twilio-26ek
3. https://dev.to/appwrite/phone-authentication-with-appwrite-and-vonage-1ep0

#### 3. SMTP Configuration (Required for Forgot Password and Magic URL)

Forgot Password and Magic URL both send email to the user.

In order to deliver mails you need to setup proper SMTP configuration.

You can use 3rd-party SMTP provider like SendInBlue, MailGun, SendGrind or any other.

For more deatils visit:

1. https://appwrite.io/docs/email-delivery
2. https://dev.to/appwrite/30daysofappwrite-getting-started-with-smtp-1e2e

#### 4. OAuth Provider Configuartion (Required for OAuth Authentication)

For adding Google, Facebook, Amazon, LinkedIn, Github or other OAuth Sign In method you need to configure each provider you want to use in their own developer app settings.

For more deatils visit:

1. https://support.google.com/cloud/answer/6158849?hl=en
2. https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app
3. https://developers.facebook.com/docs/facebook-login/web/
4. https://dev.to/appwrite/auth0-authentication-with-appwrite-7hk

### Adding AppwriteAuth Component

After making all necessary configuartion in your appwrite app, now you can begin with Appwrite AuthUI React

You can add <mark>AppwriteAuth component</mark> in your project as follows:

```jsx
import React from 'react'

import AppwriteAuth from 'appwrite-authui-react'
import 'appwrite-authui-react/dist/index.css'

import { Client, Account } from 'appwrite'

const client = new Client()
  .setEndpoint('https://[HOSTNAME_OR_IP]/v1') // Your API Endpoint
  .setProject('[project ID]') // Your project ID

const account = new Account(client)

const Example = () => {
  return (
    <AppwriteAuth
      appwriteAccount={account}
      authOptions={{
        email: true,
        phone: true,
        magicurl: true,
        anonymous: true,
        oauth: ['google', 'github']
      }}
      successUrl='[success redirect url]'
    />
  )
}
```

**Different Parameter accepted by <mark>AppwriteAuth</mark> Component**

1. <mark>appwriteAccount</mark> takes the account object of appwrite (required)
2. <mark>[authOptions](#more-details-for-authoptions-parameter)</mark> takes the object of auth options you want to use. (required)
3. <mark>[successUrl](#using-appwriteauth-with-redirect)</mark> take the url of page where you want to redirect after successful login (optional) (default: url of current page without search params)
4. <mark>[theme](#changing-color-theme-of-appwriteauth-component)</mark> takes the color you want to give to the auth component (optional) (default: #f02e65)

**Important Points**

1. Importing react is important.
2. Not importing CSS file will cause problem in style of auth component
3. Name of auth options in <mark>authOptions</mark> parament must be in smallcase as given in above code snippet
4. If you don't want redirect after successful login so don't add successUrl parameter but don't give empty string to it.
5. It is preferable to put color hexcode in theme option

## More Details for authOptions parameter

### OAuth

- For adding different oAuth providers give array of providers under oauth property like <mark>oauth : ['google', 'facebook']</mark> in authOptions parameter

```jsx
<AppwriteAuth
  appwriteAccount={account}
  authOptions={{
    oauth: ['google', 'github']
  }}
/>
```

- Available oAuth providers which you can add in you application are : amazon, apple, auth0, authentik, autodesk,
  bitbucket, bitly, box, dailymotion, discord, disqus,
  dropbox, etsy, facebook, github, gitlab, google, linkedin,
  microsoft, notion, okta, paypal, paypalSandbox, podio,
  salesforce, slack, spotify, stripe, tradeshift, tradeshiftBox,
  twitch, wordpress, yahoo, yammer, yandex, zoom
- Pass the name of providers in oauth array in smallcase.

### Email & Password

- For adding email password auth add <mark>email : true</mark> in authOptions parameter

```jsx
<AppwriteAuth
  appwriteAccount={account}
  authOptions={{
    email: true
  }}
/>
```

- Forgot password feature is inbuilt in email auth method

### Phone

- For adding phone auth add <mark>phone : true</mark> in authOptions parameter

```jsx
<AppwriteAuth
  appwriteAccount={account}
  authOptions={{
    phone: true
  }}
/>
```

### Magic URL

- For adding magic url auth add <mark>magicurl : true</mark> in authOptions parameter

```jsx
<AppwriteAuth
  appwriteAccount={account}
  authOptions={{
    magicurl: true
  }}
/>
```

### Anonymous or Guest

- For adding anonymous or guest login add <mark>anonymous : true</mark> in authOptions parameter

```jsx
<AppwriteAuth
  appwriteAccount={account}
  authOptions={{
    anonymous: true
  }}
/>
```

### Multiple auth options

You can app multiple auth option as follow:

```jsx
<AppwriteAuth
  appwriteAccount={account}
  authOptions={{
    email: true,
    anonymous: true,
    oauth: ['google']
  }}
/>
```

## Using AppwriteAuth with redirect

If you want to redirect your application to another page after successfully signing In a user pass the success redirect url in successUrl parameter.

```jsx
<AppwriteAuth
  appwriteAccount={account}
  authOptions={{
    email: true,
    phone: true
  }}
  successUrl='[success redirect url]'
/>
```

## Using AppwriteAuth with local state

In case if you don't want to redirect after sign in but wants to change change the content of page or wants to hide AppwriteAuth component, you can use the component with local state

```jsx
const Example = () => {
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

  return !user ? (
    <AppwriteAuth
      appwriteAccount={account}
      authOptions={{
        email: true
      }}
    />
  ) : (
    <button
      onClick={() => {
        account.deleteSessions()
        setUser(null)
      }}
    >
      logout
    </button>
  )
}
```

## Changing Color Theme of AppwriteAuth Component

It is the most common issue/concern that the color theme of your project don't matches the color theme of appwrite(our default theme), in this case you can pass hexcode of your theme color in <mark>theme</mark> parameter of <mark>AppwriteAuth</mark> component

For instance you want 'blue' theme

```jsx
<AppwriteAuth
  appwriteAccount={account}
  authOptions={{
    email: true,
    phone: true
  }}
  theme='#0000FF' //hexcode of blue
/>
```

## License

MIT © [Isha988](https://github.com/Isha988)
