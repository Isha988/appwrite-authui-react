import React from 'react'
import Card from './Card'
import {LinkButton} from '../Buttons'
import {email} from '../../images/card'
const image = require(`./${email}`);

function LinkSentCard({name, resend}) {
  return (
    <Card
        image={image}
        heading="Link sent successfully"
        text = {`${name} link has been sent on you email`}
    >
        <p>
            if you didn't receive the mail, <LinkButton text="resend link" onClick={resend}/>
        </p>
    </Card>
  )
}

export default LinkSentCard
