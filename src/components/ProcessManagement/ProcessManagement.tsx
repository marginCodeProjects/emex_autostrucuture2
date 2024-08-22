import styles from './ProcessManagement.module.css';
import startIcon from '../../assets/startButtonIcon.svg';
import smallProcessIcon from '../../assets/smallProcessArrow.svg';
import { IProcessManagementProps } from '../../interfaces/Main';
import { useWebSocket } from '../../hooks/UserHooks/socketHooks';
import { useEffect, useState } from 'react';
import { calculateMarginPercent } from '../../utils/utils';
import { ParserStart } from '../../api/ParserService';

const ProcessManagement: React.FC<IProcessManagementProps> = ({ file, setFile, filterId }) => {
    const { status, inputPercent, percentBannedList } = useWebSocket({ setFile });
    const [marginPercent, setMarginPercent] = useState<number>(-10);
    const handler = () => {
        console.log("работаю");
        
        const answer = ParserStart(filterId)
        console.log(answer);

    }

    useEffect(() => {
        setMarginPercent(calculateMarginPercent(inputPercent));
    }, [inputPercent]);

    return (
        <div>
            <p>{status}</p>
            {file && <div className={styles.ProcessDiv}>
                <img src={startIcon} onClick={() => handler()} className={styles.ProcessDiv__StartButton} />
                <div className={styles.ProcessDiv__group}>
                    <div className={styles.texts__div}>
                        <p className={`${styles.inter__medium}${styles.texts}`}>
                            {file && file}
                        </p>
                        <p className={`${styles.inter__medium} ${styles.texts__red}`}>
                            Заблокировано
                        </p>
                    </div>
                    <div>
                        <div
                            style={{ transform: `translateX(${marginPercent}px)` }}
                            className={styles.ProcessDiv__progressLine__smallProgressArrowDiv}
                        >
                            <p className={`${styles.inter__medium} ${styles.texts} ${styles.ProcessDiv__progressLine__smallProgressArrowText}`}>
                                {`${inputPercent}%`}
                            </p>
                            <img src={smallProcessIcon} className={styles.ProcessDiv__progressLine__smallProgressArrowImg} alt='' />
                        </div>
                    </div>
                    <div className={styles.ProcessDiv__progressLine}>
                        <div style={{ width: `${inputPercent}%` }} className={styles.ProcessDiv__progressLineFat}></div>
                    </div>
                </div>
                <div className={styles.ProcessDiv__StartButton}>
                    <p className={`${styles.inter__medium} ${styles.texts__red}`}>
                        {`${percentBannedList}%`}
                    </p>
                </div>
            </div>}
        </div>
    );
};

export default ProcessManagement;