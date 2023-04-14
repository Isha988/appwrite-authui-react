import React from 'react'
import Form from '../../Form'
import { LinkButton } from '../../Buttons'

function VerifyPhone({secret, onChange, onSubmit, resend}) {
  return (
    <div>
        <Form
            heading = "verify phone"
            fields= {
                [
                    {
                        name: "secret",
                        type: "text",
                        placeholder: "your secret",
                        value: secret,
                        onChange: onChange,
                        validation: "required|numeric|min:6|max:6"
                    }
                ]
            }
            onSubmit = {onSubmit}
            submitText = "Verify"
            // resend button
            ExtraComponent={
                <LinkButton onClick={resend} text='resend' />
            } 
        />
    </div>
  )
}

export default VerifyPhone
