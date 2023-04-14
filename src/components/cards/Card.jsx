import React from 'react'
import styles from './card.module.css'

function Card({children, image, heading, text}) {
  return (
    <div className={styles.card}>
      <img src={image} alt="card-Image"/>
      <p className={styles.cardHeading}>{heading}</p>
      <p>{text}</p>
      {children}
    </div>
  )
}

export default Card
