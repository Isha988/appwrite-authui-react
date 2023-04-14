import React, {useState} from 'react'
import {ID} from 'appwrite'
import SignInWithPhone from './SignInWithPhone';
import VerifyPhone from './VerifyPhone'

function Phone({account, onSuccess, onError, onLoading, onReset}) {

  const initialState = {
    id: null,
    phone: "",
    secret: "",

  }
  const [user, setUser] = useState(initialState);

  //ochange function for form inputs
  const onChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  } 

  //onsubmit function for signin with phone component
  const signIn = async() => {
    try{
      onLoading();
      const response = await account.createPhoneSession(
        ID.unique(),
        user.phone
      )
      setUser({...user, id: response.userId});
      onReset();
    }catch(error){
      onError(error.message);
    }
  }

  //onSubmit function for verify phone component
  const verify = async() => {
    try{
      onLoading();
      await account.updatePhoneSession(
        user.id,
        user.secret
      )
      onSuccess();
    }catch(error){
      onError(error.message);
    }
  }

  return (
    <div>
      {
        (!user.id) ? 
          (
            // display form with phone input  and send secret to user
            <SignInWithPhone 
              phone = {user.phone}
              onChange = {onChange}
              onSubmit = {signIn}
            />
          ):
          (
            // display form which takes secret sent to the user and a resend button and verify the secret
            <VerifyPhone
              secret = {user.secret}
              onChange = {onChange}
              onSubmit = {verify}
              resend ={signIn}
            />
            )
      }
    </div>
  )
}

export default Phone
