import React from 'react'
import { ImageButton } from "../../Buttons"
import * as images from '../../../images/oAuth'

function OAuth({account, provider, successUrl}) {
  const image = require(`./${images[provider]}`)
  const onClick = () => {
    account.createOAuth2Session(provider, successUrl);
  }

  return (
      // dispalay button to sign in with o auth provider 
      <ImageButton 
          image = {image}
          text = {`Continue with ${provider}`}
          onClick = {onClick}
      />
  )
}

export default OAuth
