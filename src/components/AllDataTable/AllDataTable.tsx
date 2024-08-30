import { useState, useEffect } from 'react'; // Импортируем хуки React
import { useLanguage } from '../Other/LanguageProvider/LanguageProvider';
import styles from './AllDataTable.module.css';
import { historyTexts } from '../../components/Other/LanguageProvider/languages';
import { GetFiles} from '../../api/FilesService';
import { useAuth } from '../Other/authContext/authContext';
import { Alert } from 'antd';
import { Files } from '../../interfaces/Main';
import { handleDownloadFile } from '../../utils/utils';
const AllDataTable = () => {
    const { token } = useAuth();
    const { language } = useLanguage();
    const [files, setFiles] = useState<Files[] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const get_files_handler = async () => {
        setLoading(true);
        const { success, files, message } = await GetFiles(token);
        setLoading(false);
        if (success) {
            setFiles(files || []);
        } else {
            setErrorMessage(message || 'Неизвестная ошибка');
        }
    };

    useEffect(() => {
        get_files_handler();
    }, []);

    return (
        <>
            {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
            {loading ? (
                <div className="spinner__container">
                    <div className="spinner"></div>
                </div>

            ) : (
                <div className={styles.table__container}>
                    <div className={styles.table__line}>
                        <p className={`${styles.table__texts} ${styles.inter__medium}`}>{historyTexts[language].date}</p>
                        <p className={`${styles.table__texts} ${styles.inter__medium}`}>{historyTexts[language].filters}</p>
                        <p className={`${styles.table__texts} ${styles.inter__medium}`}>{historyTexts[language].dataBeforeParsing}</p>
                        <p className={`${styles.table__texts} ${styles.inter__medium}`}>{historyTexts[language].dataAfterParsing}</p>
                    </div>
                    {files?.map((file) => (
                        <div key={file.id} className={styles.table__line}>

                            <p className={`${styles.table__texts} ${styles.inter__medium}`}>{file.date.slice(0, 10)}</p>
                            <p className={`${styles.table__texts} ${styles.inter__medium}`}>{file.new_filter_id}</p>
                            <a href={`https://127.0.0.1:8000/v1/files/download_file/before_parsing/${file.id}`}className={`${styles.table__texts} ${styles.inter__medium}`} >{file.before_parsing_filename}</a>
                            <a href={`https://127.0.0.1:8000/v1/files/download_file/after_parsing/${file.id}`} className={`${styles.table__texts} ${styles.inter__medium}`} >{file.after_parsing_filename}</a>

                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default AllDataTable;