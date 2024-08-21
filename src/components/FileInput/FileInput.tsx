import React from 'react';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { texts } from '../LanguageProvider/languages';
import { useLanguage } from '../LanguageProvider/LanguageProvider';
import icon from '../../assets/UploadDataIcon.svg'
import styles from './FileInput.module.css'
const { Dragger } = Upload;

const FileUploadPage: React.FC = () => {
    const { language } = useLanguage(); // Вызов хука для получения языка

    const props: UploadProps = {
        name: 'file',
        multiple: false,
        withCredentials: true, showUploadList: false,
        action: 'https://api.forprojectstests.ru/v1/files/upload_file',
        onChange(info) {
            const { status } = info.file;

            if (status === 'done') {
                message.success("Файл успешно загружен");
            } else if (status === 'error') {
                message.error(`Файл не соответствует шаблону`);
            }
        },

    };

    return (
        <>
            <Dragger {...props} style={{ width: '474px', marginBottom: '20px' }} >
                <img src={icon} className={styles.icon} />
                <p className={`${styles.inter__medium} ${styles.hintText}`} dangerouslySetInnerHTML={{ __html: texts[language].dragAndDropInput }} />
            </Dragger>
            <a href='https://api.forprojectstests.ru/v1/files/get_shablon' className={`${styles.inter__medium} ${styles.downloadTemplate}`}>{texts[language].downloadTemplate}</a>
        </>
    );
};

export default FileUploadPage;