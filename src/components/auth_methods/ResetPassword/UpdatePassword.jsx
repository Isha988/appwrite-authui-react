import React from 'react'
import Form from '../../Form'

function UpdatePassword({password, confirmPassword, onChange, updatePassword}) {
  return (
    <div>
        <Form
          heading="update password"
            fields={[
                {
                name: 'password',
                type: 'password',
                placeholder: 'atleat 8-character long',
                value: password,
                onChange: onChange ,
                validation: 'required|min:8'
                },
                {
                name: 'confirmPassword',
                type: 'password',
                placeholder: 'atleast 8-character long',
                value: confirmPassword,
                onChange: onChange ,
                validation: 'required|min:8'
                }
            ]}
            onSubmit={updatePassword}
            submitText='Reset'
        />
    </div>
  )
}

export default UpdatePassword
