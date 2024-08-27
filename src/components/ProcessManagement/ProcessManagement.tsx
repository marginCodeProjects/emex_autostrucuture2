import styles from './ProcessManagement.module.css';
import startIcon from '../../assets/startButtonIcon.svg';
import smallProcessIcon from '../../assets/smallProcessArrow.svg';
import { IProcessManagementProps, StatusMessageKeys, StatusMessagesType } from '../../interfaces/Main';
import { useWebSocket } from '../../hooks/UserHooks/socketHooks';
import { useEffect, useState } from 'react';
import { calculateMarginPercent } from '../../utils/utils';
import { ParserStart } from '../../api/ParserService';
import { useLanguage } from '../LanguageProvider/LanguageProvider'
import { texts, statusMessages } from '../LanguageProvider/languages';
const ProcessManagement: React.FC<IProcessManagementProps> = ({ file, setFile, filterId }) => {
    const { language } = useLanguage();
    const { status, inputPercent, percentBannedList } = useWebSocket({ setFile });
    const [marginPercent, setMarginPercent] = useState<number>(-10);
    const handler = () => {
        console.log("работаю");

        const answer = ParserStart(filterId)
        console.log(answer);

    }
   const statusMessage = () => {
    const normalizedStatus = status.trim();

    switch (normalizedStatus) {
        case 'PARSING_COMPLETED':
            return <>{statusMessages[language].PARSING_COMPLETED}</>;
        case 'ALL_PROXIES_BANNED':
            return <>{statusMessages[language].ALL_PROXIES_BANNED}</>;
        case 'PARSER_NOT_STARTED_DATA_SAVED':
            return <>{statusMessages[language].PARSER_NOT_STARTED_DATA_SAVED}</>;
        case 'PARSER_RUNNING':
            return <>{statusMessages[language].PARSER_RUNNING}</>;
        case 'Парсер не запущен':
            return<>{file}</>
    }
};
   
    
    useEffect(() => {
        setMarginPercent(calculateMarginPercent(inputPercent));
    }, [inputPercent]);

    return (
        <div>
         
            {file && <div className={styles.ProcessDiv}>
                <img src={startIcon} onClick={() => handler()} className={styles.ProcessDiv__StartButton} />
                <div className={styles.ProcessDiv__group}>
                    <div className={styles.texts__div}>
                        <p className={`${styles.inter__medium}${styles.texts}`}>
                            {statusMessage()}
                        </p>
                        <p className={`${styles.inter__medium} ${styles.texts__red}`}>
                            {texts[language].blocked}
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