import React from 'react'
import { useState, useRef} from "react";
import SimpleReactValidator from "simple-react-validator";
import styles from'./form.module.css'

function Form({heading, fields, onSubmit,submitText, ExtraComponent}) {
  
    const validator = useRef(new SimpleReactValidator({className:styles.formError}));
    const [, forceUpdate] = useState();

    function submit(e){
            e.preventDefault();
            //form validation before submitting
            if (validator.current.allValid()) {
                onSubmit();
                validator.current.hideMessages();
                forceUpdate(1);
            } else {
                validator.current.showMessages();
                forceUpdate(2);
            }  
    } 

    return (
        <div className={styles.formCover}>
            <div className="formHeader">
                <p className={styles.formHeading}>
                    {heading}
                </p>
            </div>
            <form onSubmit={submit} className={styles.form}>
                {
                    // loops and create inputs of form
                    fields.map((field, index) => (
                        <div key={index} className={styles.formInputCover}>
                            <label htmlFor={field.name}>{field.name}</label>
                            {validator.current.message(field.name, field.value, field.validation)}
                            <input 
                                type={field.type} 
                                name={field.name} 
                                id={field.name} 
                                placeholder={field.placeholder}
                                value = {field.value}
                                onChange = {field.onChange}
                            />
                        </div>
                    ))
                }
                {/* extra component are shown here */}
                <div className={styles.formExtraComponent}>{ExtraComponent}</div>
                <input type="submit" value={submitText} className={styles.formSubmitBtn}/>
            </form>
        </div>
    )
}

export default Form
