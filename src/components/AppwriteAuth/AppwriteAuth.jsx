import React, {useState, useEffect} from 'react'
import styles from './appwriteAuth.module.css'
import * as AuthMethod from '../auth_methods' 
import {AuthButton} from '../Buttons'
import {AVAILABLE_AUTH_OPTIONS, DEFAULT_THEME} from '../constant'
import {WelcomeCard} from '../cards'


function AppwriteAuth(
  { appwriteAccount, 
    authOptions, 
    successUrl = `${document.location.origin}${document.location.pathname}`, 
    theme = DEFAULT_THEME}
) {
  const [activeForm, setActiveForm] = useState(null); // conatin currently opened form
  // setting the active form state on component did mount
  useEffect(() => {
    const verify = (new URL(document.location)).searchParams.get('verify');
    const current = (verify == AVAILABLE_AUTH_OPTIONS.MAGIC_URL &&  AVAILABLE_AUTH_OPTIONS.MAGIC_URL)||
                    (verify == AVAILABLE_AUTH_OPTIONS.RESET_PASSWORD && AVAILABLE_AUTH_OPTIONS.RESET_PASSWORD) ||
                    (authOptions[AVAILABLE_AUTH_OPTIONS.EMAIL_PASSWORD] && AVAILABLE_AUTH_OPTIONS.EMAIL_PASSWORD) || 
                    (authOptions[AVAILABLE_AUTH_OPTIONS.PHONE] && AVAILABLE_AUTH_OPTIONS.PHONE) ||
                    (authOptions[AVAILABLE_AUTH_OPTIONS.MAGIC_URL] && AVAILABLE_AUTH_OPTIONS.MAGIC_URL);

    setActiveForm(current);
  },[])

  const initialRequest = {
    success: false,
    loading: false,
    error: false,
    message: ""
  }

  const [request, setRequest] = useState(initialRequest); // contains loading, error and success state of session request

  //redirecting after user is successfully signed
  useEffect(() => {
    if(request.success){
      window.location = successUrl;
    }
  },[request])

  //function for successfull sign in
  const onSuccess = () =>{
    setRequest({
      success: true,
      loading: false,
      error: false,
      message: ""
    });
  }

  //function for lodaing 
  const onLoading = () => {
    setRequest({
      success: false,
      loading: true,
      error: false,
      message: ""
    })
  }

  //function for error while signing in
  const onError = (message) => {
    setRequest({
      success: false,
      loading: false,
      error: true,
      message: message
    })
  }
  //functio for resetting request state
  const onReset = () => {
    setRequest({initialRequest})
  }

  return (
    <div id="appwrite-auth" className={styles.appwriteAuth} style={{'--theme': theme}}>
      {/* auth-form 
        showing currently opened auth form on basis of activeform state 
      */}
      <div id="auth-form" className={styles.authForm}>
          {
            {
              [AVAILABLE_AUTH_OPTIONS.EMAIL_PASSWORD] : 
                <AuthMethod.EmailPassword 
                  account={appwriteAccount} 
                  onSuccess={onSuccess}
                  onError = {onError}
                  onLoading = {onLoading}
                  setActiveForm = {setActiveForm}
                />,
              [AVAILABLE_AUTH_OPTIONS.PHONE] : 
                <AuthMethod.Phone 
                  account={appwriteAccount} 
                  onSuccess={onSuccess}
                  onError = {onError}
                  onLoading = {onLoading}
                  onReset={onReset}
                />,
              [AVAILABLE_AUTH_OPTIONS.MAGIC_URL] : 
                <AuthMethod.MagicUrl 
                  account={appwriteAccount} 
                  onSuccess={onSuccess}
                  onError = {onError}
                  onLoading = {onLoading}
                  onReset={onReset}
                />,
                [AVAILABLE_AUTH_OPTIONS.RESET_PASSWORD] : 
                <AuthMethod.ResetPassword
                  account={appwriteAccount} 
                  onReset={onReset}
                  onError = {onError}
                  onLoading = {onLoading}
                  setActiveForm = {setActiveForm}
                />
            }[activeForm] || <WelcomeCard/>
          }
          {
            (request.loading) && (<p className={styles.requestResponse}>Loading</p>)
          }
          {
            (request.error) && (<p className={`${styles.requestError} ${styles.requestResponse}`}>{request.message}</p>)
          }
      </div>

      {/* auth-buttons
          showing different auth method button 
      */}
      <div id="auth-buttons" className={styles.authButtons}>
        {
          // email password auth button 
          authOptions[AVAILABLE_AUTH_OPTIONS.EMAIL_PASSWORD] && 
          (
            <AuthButton authMethod = {AVAILABLE_AUTH_OPTIONS.EMAIL_PASSWORD} setActiveForm = {setActiveForm} active={activeForm}/>
          )
        }

        {
          // phone auth button 
          authOptions[AVAILABLE_AUTH_OPTIONS.PHONE] && 
          (
            <AuthButton authMethod = {AVAILABLE_AUTH_OPTIONS.PHONE} setActiveForm = {setActiveForm} active={activeForm}/>
          )
        }

        {
          // magic url auth button 
          authOptions[AVAILABLE_AUTH_OPTIONS.MAGIC_URL] && 
          (
            <AuthButton authMethod = {AVAILABLE_AUTH_OPTIONS.MAGIC_URL} setActiveForm = {setActiveForm} active={activeForm}/>
          )
        }

        {
          // OAuth buttons
          authOptions[AVAILABLE_AUTH_OPTIONS.OAUTH] && authOptions[AVAILABLE_AUTH_OPTIONS.OAUTH].map((provider, index) => (
            <AuthMethod.OAuth 
              key = {index}
              account = {appwriteAccount}
              provider = {provider}
              successUrl = {successUrl}
            />
          ))
        }

        {
          // link for anonymous session or continue as a guest 
          authOptions[AVAILABLE_AUTH_OPTIONS.ANONYMOUS] && 
          (
            <AuthMethod.Anonymous 
              account = {appwriteAccount} 
              onSuccess={onSuccess}
              onError = {onError}
              onLoading = {onLoading}
            />
          )
        }
      </div>
    </div>
  )
}

export default AppwriteAuth;
