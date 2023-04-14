import React from 'react'
import Form from '../../Form'
import { useState } from 'react'
import {ID} from 'appwrite'

function SignInWithEmailPassword({account, onLoading, onSuccess, onError}) {
    const initialState = {
        name:"",
        email:"",
        password:"",
    }

    const [user, setUser] = useState(initialState);
    const {name, email, password} = user;

    const onChange =(e) => {
        setUser({...user, [e.target.name] : e.target.value});
    }

    const onSubmit = async() => {
        try{
          onLoading();
          await account.create(ID.unique(), email, password, name);
          await account.createEmailSession(email, password);
          setUser(initialState);
          onSuccess();
        }catch(error){
          onError(error.message);
        }
    }

    return (
        <div>
            <Form
                heading = "Sign Up"
                fields= {
                    [   
                        {
                            name: "name",
                            type: "name",
                            placeholder: "Your name here",
                            value: name,
                            onChange: onChange,
                            validation: "required|alpha_space"
                        },
                        {
                            name: "email",
                            type: "email",
                            placeholder: "example@example.com",
                            value: email,
                            onChange: onChange,
                            validation: "required|email"
                        },
                        {
                            name: "password",
                            type: "password",
                            placeholder: "atleast 8-character long",
                            value: password,
                            onChange: onChange,
                            validation: "required|min:8"
                        }
                    ]
                }
                onSubmit = {onSubmit}
                submitText = "Sign Up"
            />
        </div>
    )
}

export default SignInWithEmailPassword

