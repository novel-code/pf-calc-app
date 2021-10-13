import { useState } from 'react';
import styles from './popup.module.css';

const Popup = function ( {message, show , sucMsg , failMsg}) {
    const [popup , setPopup] = useState(true);


    setTimeout(function() {
        console.log(message, show)
    }, 2000)

    console.log(message, show, sucMsg, failMsg)
    
    return (
            
        <div className={styles.modal}>


        <div className={styles.modalContent}>
          <p>{sucMsg}</p>
          <p><button onClick={()=> setPopup(false)} className={styles.close}>OK</button></p>
        </div>
    
      </div>

    )

 
}

    
   

  



export default Popup;