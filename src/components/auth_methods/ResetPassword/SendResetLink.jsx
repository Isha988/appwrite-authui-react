import React from 'react'
import Form from '../../Form'

function SendResetLink({email, onChange, sendResetLink}) {
  return (
    <div>
        <Form
          heading="recover password"
            fields = {[
                {
                name : "email",
                type : "email",
                placeholder : "example@example.com",
                value: email,
                onChange: onChange ,
                validation: 'required|email'
                }
            ]}
            onSubmit = {sendResetLink}
            submitText = "Send"
        />
    </div>
  )
}

export default SendResetLink
