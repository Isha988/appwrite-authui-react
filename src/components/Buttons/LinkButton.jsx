import React from 'react'
import styles from'./button.module.css'

function LinkButton({onClick, text}) {
  return (
    <button type="button" onClick={onClick} className={styles.linkBtn}> {text} </button>
  )
}

export default LinkButton
