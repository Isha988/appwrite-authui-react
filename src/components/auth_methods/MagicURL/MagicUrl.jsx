import React, {useState, useEffect} from 'react'
import {ID} from 'appwrite'
import VerifyMagicURL from './VerifyMagicURL'
import SignInWithMagicURL from './SignInWithMagicURL';
import { LinkSentCard } from '../../cards';
import {AVAILABLE_AUTH_OPTIONS} from '../../constant';
 
function MagicUrl({account, onSuccess, onLoading, onError, onReset}) {

  const initialState = {
    id: null,
    email: "",
    secret: "",

  }
  const [user, setUser] = useState(initialState);

  //checking for verification call
  useEffect(() => {
    const searchParams = (new URL(document.location)).searchParams;

    if(searchParams.get('verify') == AVAILABLE_AUTH_OPTIONS.MAGIC_URL){
      setUser({
        ...user, 
        id: searchParams.get('userId'), 
        secret: searchParams.get('secret')
      })
    }
  }, [])

   //ochange function for form inputs
   const onChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  } 

  //onsubmit function for signin with magic url component
  const signIn = async() => {
    try{
      onLoading();
      const response = await account.createMagicURLSession(
        ID.unique(),
        user.email,
        `${document.location.origin}${document.location.pathname}?verify=${AVAILABLE_AUTH_OPTIONS.MAGIC_URL}`
      )
      setUser({...user, id: response.$id});
      onReset();
    }catch(error){
      console.log(error);
      onError(error.message);
    }
  }

  //onSubmit function for verify magic url component
  const verify = async() => {
    try{
      onLoading();
      await account.updateMagicURLSession(
        user.id,
        user.secret
      )
      onSuccess();
    }catch(error){
      console.log(error);
      onError(error.message);
    }
  }

  return (
    <div>
      {
      (!user.id) ? 
        (
           // display form with email input wher user id is not known and send link to the user
          <SignInWithMagicURL
            email = {user.email}
            onChange = {onChange}
            onSubmit = {signIn}
          />
        ):
        (!user.secret) ? 
        (
          // display card which shows link sent to email and resend button
          <LinkSentCard resend={signIn} name="Sign in"/>
        ) :
        (
          //display card which shows we are verifing you and verify the link
          <VerifyMagicURL
            verify = {verify}
          />
        )
      }
    </div>
  )
}

export default MagicUrl
