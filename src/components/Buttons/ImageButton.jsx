import React from 'react'
import styles from'./button.module.css'

function ImageButton({image, text, onClick, active}) {
  return (
    <button onClick={onClick} className={`${styles.imageBtn} ${active && styles.activeBtn}`}>
      <span className={styles.btnImageCover}><img src={image} alt={text} className="btn-img"/></span>
      {text}
    </button>
  )
}

export default ImageButton
