import React, {useState, useEffect} from 'react'
import SendResetLink from './SendResetLink';
import UpdatePassword from './UpdatePassword';
import { LinkSentCard } from '../../cards';
import {AVAILABLE_AUTH_OPTIONS} from '../../constant';

function ResetPassword({account, onReset, onError, onLoading, setActiveForm}) {
  const initialState = {
    id: null,
    email: "",
    secret:"",
    password: "",
    confirmPassword: ""
  }
  const [user, setUser] = useState(initialState);
  
   //checking for verification call
   useEffect(() => {
    const searchParams = (new URL(document.location)).searchParams;

    if(searchParams.get('verify') == AVAILABLE_AUTH_OPTIONS.RESET_PASSWORD){
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

  //onsubmit function for send reset link component
  const sendResetLink = async() => {
    try {
      onLoading();
      const response = await account.createRecovery(
        user.email, 
        `${document.location.origin}${document.location.pathname}?verify=${AVAILABLE_AUTH_OPTIONS.RESET_PASSWORD}`
      )
      setUser({...user, id: response.$id});  
      onReset();   
    } catch (error) {
       onError(error.message);
    }
  }

  //on submit function for update password commponent
  const updatePassword = async ()=> {
      try{
        await account.updateRecovery(
          user.id, 
          user.secret, 
          user.password, 
          user.confirmPassword
        );
        onReset();
        setActiveForm(AVAILABLE_AUTH_OPTIONS.EMAIL_PASSWORD);
      }catch(error){
        onError(error.message);
      }
  }  

  return (
    <div>
      {
        (!user.id) ? 
          (
            // display form which have a email input and send verification link
          <SendResetLink
            email = {user.email}
            onChange = {onChange}
            sendResetLink = {sendResetLink}
          />
        ):
        (!user.secret) ? 
        (
          // display card which shows link sent to your mail and resend button
          <LinkSentCard resend={sendResetLink} name="Password recovery"/>
        ) :
        (
          // display form with password and confirm password inpu, it updates the password of user
          <UpdatePassword
            password={user.password}
            confirmPassword = {user.confirmPassword}
            onChange = {onChange}
            updatePassword = {updatePassword}
          />
        ) 
      }
    </div>
  )
}

export default ResetPassword
