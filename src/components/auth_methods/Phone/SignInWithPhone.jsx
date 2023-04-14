import React from 'react'
import Form from "../../Form"

function SignInWithPhone({phone, onChange, onSubmit}) {
  return (
    <div>
        <Form
            heading="continue with phone"
            fields= {
                [
                    {
                        name: "phone",
                        type: "text",
                        placeholder: "+91**********",
                        value: phone,
                        onChange: onChange,
                        validation: "required|phone"
                    }
                ]
            }
            onSubmit = {onSubmit}
            submitText = "Continue"
        />
    </div>
  )
}

export default SignInWithPhone
