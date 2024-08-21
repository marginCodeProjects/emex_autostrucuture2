import styles from './ProcessManagement.module.css'
import startIcon from '../../assets/startButtonIcon.svg'
import smallProcessIcon from '../../assets/smallProcessArrow.svg'
const ProcessManagement = () => {
    const inputPercent = 80
    const calculateMarginPercent = (inputPercent: number) => {
        const mp = (inputPercent * 0.960)
        return mp
    }
    let ws2 = new WebSocket("wss://api.forprojectstests.ru/v1/new_parser/websocket_status") 
    ws2.onmessage = function(event) {
       console.log(event,"Я не процент");
       
    }
    let ws1 = new WebSocket("wss://api.forprojectstests.ru/v1/new_parser/websocket_percent") 
    ws1.onmessage = function(event) {
       console.log(event,'я процент');
       
    }
    const marginPercent = calculateMarginPercent(inputPercent)
    return (
        <div className={styles.ProcessDiv}>
            <img src={startIcon} className={styles.ProcessDiv__StartButton} />
            <div className={styles.ProcessDiv__group}>
                <div className={styles.texts__div}>
                    <p className={`${styles.inter__medium}${styles.texts}`}>
                        shablon1.09.2025
                    </p>
                    <p
                        className={`${styles.inter__medium} ${styles.texts__red}`}
                    >
                        Заблокировано
                    </p>
                </div>
                <div>

                    <div
                        style={{ marginLeft: `${marginPercent}%` }}
                        className={
                            styles.ProcessDiv__progressLine__smallProgressArrowDiv
                        }
                    >
                        <p
                            className={`${styles.inter__medium} ${styles.texts} ${styles.ProcessDiv__progressLine__smallProgressArrowText}`}
                        >
                            {`${inputPercent}%`}
                        </p>
                        <img src={smallProcessIcon} className={styles.ProcessDiv__progressLine__smallProgressArrowImg} alt='' />
                    </div>
                </div>

                <div className={styles.ProcessDiv__progressLine}>  <div style={{ width: `${inputPercent}%` }} className={styles.ProcessDiv__progressLineFat}></div></div>
            </div>
            <div className={styles.ProcessDiv__StartButton}>
                <p className={`${styles.inter__medium} ${styles.texts__red}`}>
                    5%
                </p>
            </div>
        </div>
    )
}

export default ProcessManagement
