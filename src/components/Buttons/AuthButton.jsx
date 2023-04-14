import React from 'react'
import ImageButton from './ImageButton'
import * as images from '../../images/authMethod'

function AuthButton({authMethod, setActiveForm, active}) {
  const image = require(`./${images[authMethod]}`)
  const onClick = () => {setActiveForm(authMethod)}
  return (
    <ImageButton 
      active={active==authMethod}
      text={`continue with ${authMethod}`} 
      onClick={onClick} 
      image={image}
    />
  )
}

export default AuthButton
