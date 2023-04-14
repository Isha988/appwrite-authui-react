import React from 'react'
import Card from './Card'
import {hello} from '../../images/card'
const image = require(`./${hello}`);

function WelcomeCard() {
  return (
    <Card
        image={image}
        heading="Hey! Welcome"
        text = "It's good to see you here again"
    />
  )
}

export default WelcomeCard
