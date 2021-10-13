import styles from './popup.module.css';

const Popup = function ({logic, sucOfFailMsg} ) {
    

    
    
    return (
            
        <div className={styles.modal}>


        <div className={styles.modalContent}>
          <p>{sucOfFailMsg}</p>
          <p><button onClick={logic} className={styles.close}>OK</button></p>
        </div>
    
      </div>

    )
 
    }

    
   

  



export default Popup;