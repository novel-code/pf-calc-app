import { deleteEmpFlag } from '../Requests/DeleteEmpFlag';
import styles from './popup.module.css';

const Popup = function ({logic, sucOrFailMsg, cancelBtn, id} ) {

    
    return (
            
        <div className={styles.modal}>


        <div className={styles.modalContent}>
          <p>{sucOrFailMsg}</p>
          <div >

          <p><button onClick={() => {
            if(!cancelBtn) {
              logic()
            } else {
              deleteEmpFlag(id)
              alert("deleted");
              logic()
            }

          }} className={styles.close} style={{marginRight: "1rem"}} >OK</button>
         

          {cancelBtn ? <button onClick={logic} className={styles.close}>Cancel</button>: ""} </p>
          </div>


        </div>
      </div>

    )
 
    }

    
   

  



export default Popup;