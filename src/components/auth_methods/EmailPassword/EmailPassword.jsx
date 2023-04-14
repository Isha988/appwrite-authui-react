import React , {Fragment} from 'react'
import {useState} from 'react';
import {LinkButton} from '../../Buttons';
import SignInWithEmailPassword from './SignInWithEmailPassword';
import SignUpWithEmailPassword from './SignUpWithEmailPassword';
import {SIGNIN, SIGNUP} from '../../constant'


function EmailPassword({account, onLoading, onSuccess, onError, setActiveForm}) {
    const [form, setForm] = useState(SIGNIN);

    const onClick = () => {
        (form == SIGNIN) ? setForm(SIGNUP) : setForm(SIGNIN);
    }

    return (
    <div>
        {
            // display either sign in ou sign up form based on the form state
            (form == SIGNIN) ? (
                <Fragment>
                    <SignInWithEmailPassword 
                        account={account} 
                        onSuccess={onSuccess}
                        onError = {onError}
                        onLoading = {onLoading}
                        setActiveForm = {setActiveForm}
                    />
                    <p>Don't have an account, <LinkButton text={SIGNUP} onClick={onClick}/> </p>
                </Fragment>
            ) : (
                <Fragment>
                    <SignUpWithEmailPassword 
                        account={account} 
                        onSuccess={onSuccess}
                        onError = {onError}
                        onLoading = {onLoading}
                    />
                    <p>Already have an account, <LinkButton text={SIGNIN} onClick={onClick}/> </p>
                </Fragment>
            )  
        }
    </div>
  )
}

export default EmailPassword
