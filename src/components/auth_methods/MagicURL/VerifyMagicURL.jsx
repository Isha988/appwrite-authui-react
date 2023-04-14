import React, {useEffect} from 'react'
import {Card} from '../../cards'
import {verify} from '../../../images/card'
const image = require(`./${verify}`);

function VerifyMagicURL({verify}) {
    useEffect(()=> {
        verify();
    },[])
    
  return (
    <Card
      image={image}
      heading = "Verifying"
      text="Logging you in in few seconds"
    />
  )
}

export default VerifyMagicURL
