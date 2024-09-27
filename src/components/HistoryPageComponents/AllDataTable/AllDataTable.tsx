import { useState, useEffect } from 'react';
import { useLanguage } from '../../Other/LanguageProvider/useLanguage';
import styles from './AllDataTable.module.css';
import { historyTexts } from '../../../components/Other/LanguageProvider/languages';
import { ApplyVATCalculation, GetFiles } from '../../../api/FilesService';
import { useAuth } from '../../Other/authContext/useAuth';
import { message, Popover } from 'antd';
import { AllDataTableProps, Files } from '../../../interfaces/Main';

const AllDataTable: React.FC<AllDataTableProps> = ({ setFileId }) => {
    const { token } = useAuth();
    const { language } = useLanguage();
    const [files, setFiles] = useState<Files[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [popoverVisible, setPopoverVisible] = useState<number | null>(null);

    const get_files_handler = async () => {
        setLoading(true);
        const { success, files, message } = await GetFiles(token, language);
        setLoading(false);
        if (success) {
            setFiles(files || []);
        } else {
            disclamer(message)
        }
    };

    const applyVAT = async (file_id: number) => {
        const { success, files, message } = await ApplyVATCalculation(token, language, file_id)
        if (success) {
            setFiles(files || []);
            setPopoverVisible(null); // Close Popover after VAT calculation
        } else {
            disclamer(message)
        }
    }

    const disclamer = (message: string | undefined) => {
        messageApi.open({
            type: "warning",
            content: message,
        });
    };

    useEffect(() => {
        get_files_handler();
    }, []);

    const afterParsingPopup = (id: number) => {
        return (
            <div>
                <a href={`https://api.autostructure.ru/v1/files/download_file/after_parsing/${id}`} className={`${styles.table__textsForLinks} ${styles.inter__medium}`} >{historyTexts[language].downloadFile}</a>
                <p className={`${styles.table__textsForLinks} ${styles.inter__medium}`} style={{ width: '100%' }} onClick={() => setFileId(id)}>{historyTexts[language].viewFile}</p>
                <p className={`${styles.table__textsForLinks} ${styles.inter__medium}`} style={{ width: '100%' }} onClick={() => applyVAT(id)}>{historyTexts[language].ApplyVATCalculation}</p>
            </div>
        );
    }

    return (
        <>
            {contextHolder}
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
                            <a href={`https://api.autostructure.ru/v1/files/download_file/before_parsing/${file.id}`} className={`${styles.table__textsForLinks} ${styles.inter__medium}`} >{file.before_parsing_filename}</a>
                            {file.after_parsing_filename != null ? (
                                <Popover
                                    content={afterParsingPopup(file.id)}
                                    visible={popoverVisible === file.id}
                                    onVisibleChange={(visible) => setPopoverVisible(visible ? file.id : null)}
                                >
                                    <p className={`${styles.table__textsForLinks} ${styles.inter__medium}`} style={{ width: '25%' }} >{file.after_parsing_filename}</p>
                                </Popover>
                            ) : <p style={{ width: '25%' }} ></p>}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default AllDataTable;