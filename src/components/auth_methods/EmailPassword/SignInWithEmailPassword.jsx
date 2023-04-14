import React from 'react'
import Form from '../../Form'
import { useState } from 'react'
import { LinkButton } from '../../Buttons'
import {AVAILABLE_AUTH_OPTIONS} from '../../constant'

function SignInWithEmailPassword({account, onSuccess, onLoading, onError, setActiveForm}) {
  const initialState = {
    email: '',
    password: ''
  }

  const [user, setUser] = useState(initialState)
  const { email, password } = user

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = async() => {
      try{
        onLoading();
        await account.createEmailSession(email, password);
        setUser(initialState);
        onSuccess();
      }catch(error){
        onError(error.message);
      }
  }
  const forgotPassword = () => {
    setActiveForm(AVAILABLE_AUTH_OPTIONS.RESET_PASSWORD);
  }
  return (
    <div>
      <Form
        heading = "Sign In"
        fields={[
          {
            name: 'email',
            type: 'email',
            placeholder: 'example@example.com',
            value: email,
            onChange: onChange ,
            validation: 'required|email'
          },
          {
            name: 'password',
            type: 'password',
            placeholder: 'atleat 8-character long',
            value: password,
            onChange: onChange ,
            validation: 'required|min:8'
          }
        ]}
        onSubmit={onSubmit}
        submitText='Sign In'
        // forgotPassword button
        ExtraComponent={
          <LinkButton onClick={forgotPassword} text='forgot password' />
        } 
      />
    </div>
  )
}

export default SignInWithEmailPassword
