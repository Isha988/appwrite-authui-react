import React from 'react'
import {LinkButton} from '../../Buttons'

function Anonymous({account, onLoading, onSuccess, onError}) {
  const onClick = async() => {
    try{
      onLoading();
      await account.createAnonymousSession();
      onSuccess();
    }
    catch(error){
      onError(error.message);
    }
  }
  return (
    <LinkButton 
      text="continue as a guest" 
      onClick={onClick}
    />
  )
}

export default Anonymous
