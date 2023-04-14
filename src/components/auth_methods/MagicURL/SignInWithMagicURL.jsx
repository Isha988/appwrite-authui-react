import React from 'react'
import Form from "../../Form"

function SignInWithMagicURL({email, onChange, onSubmit}) {
  return (
    <div>
        <Form
            heading="continue with Magic url"
            fields= {
                [
                    {
                        name: "email",
                        type: "email",
                        placeholder: "example@example.com",
                        value: email,
                        onChange: onChange,
                        validation: "required|email"
                    }
                ]
            }
            onSubmit = {onSubmit}
            submitText = "Continue"
        />
    </div>
  )
}

export default SignInWithMagicURL