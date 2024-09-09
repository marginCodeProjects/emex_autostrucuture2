import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { texts } from '../../Other/LanguageProvider/languages';
import { useLanguage } from '../../Other/LanguageProvider/useLanguage';
import icon from '../../../assets/UploadDataIcon.svg'
import styles from './FileInput.module.css'
import { IFileUploadPageProps } from '../../../interfaces/Main';
import { useAuth } from '../../Other/authContext/useAuth';

const { Dragger } = Upload;

const FileUploadPage: React.FC<IFileUploadPageProps> = ({ setFile }) => {
    const { language } = useLanguage(); // Вызов хука для получения языка
    const { token } = useAuth();
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        showUploadList: false,
        headers: { 'access-token': `${token}` },
        action: 'https://127.0.0.1:8000/v1/files/upload_file',
        onChange(info) {
            const { status } = info.file;

            if (status === 'done') {
                message.success(language === 'RU'?"Файл успешно загружен":"The file has been successfully uploaded");
                if (info.file.name) {
                    setFile(info.file.name)
                    localStorage.setItem('fileName', info.file.name)
                }
            } else if (status === 'error') {
                message.error(language === 'RU'?"Файл не соответствует шаблону":"File does not match the template");
            }
        },

    };

    return (
        <>
            <Dragger {...props} style={{ width: '474px', marginBottom: '20px' }} >
                <img src={icon} className={styles.icon} />
                <p className={`${styles.inter__medium} ${styles.hintText}`} dangerouslySetInnerHTML={{ __html: texts[language].dragAndDropInput }} />
            </Dragger>
            <a href='https://127.0.0.1:8000/v1/files/get_shablon' className={`${styles.inter__medium} ${styles.downloadTemplate}`}>{texts[language].downloadTemplate}</a>
        </>
    );
};

export default FileUploadPage;