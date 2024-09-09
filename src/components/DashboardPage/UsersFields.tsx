import { useEffect, useState } from 'react';
import { IUsersProps, UserFormValues } from '../../interfaces/Main';
import { dashboardTexts } from '../Other/LanguageProvider/languages';
import { useLanguage } from '../Other/LanguageProvider/useLanguage';
import styles from './Users.module.css';
import { Input, message, Select } from 'antd';
import { CreateUser, EditUser } from '../../api/UserService';
import { useAuth } from '../Other/authContext/useAuth';
import { CopyTwoTone } from '@ant-design/icons';
const UsersFields: React.FC<IUsersProps> = ({ setEditingCardId, editingCardId, users, setUsers }) => {
    const { token } = useAuth();
    const { language } = useLanguage();
    const [messageApi, contextHolder] = message.useMessage();
    const [formValues, setFormValues] = useState<UserFormValues>({
        fullName: '',
        description: '',
        username: '',
        password: '',
        isAdmin: false,
        isAdmunUI: undefined
    });

    const [newPassword, setNewPassword] = useState<string | undefined>('');
    const [newUsername, setNewUsername] = useState<string | undefined>('');


    useEffect(() => {
        if (typeof editingCardId === 'number' && users) {
            const user = users.find((user) => user.id === editingCardId);
            if (user) {
                setFormValues({
                    fullName: user.fullname,
                    description: user.description,
                    username: user.username,
                    password: '',
                    isAdmin: user.is_admin,
                    isAdmunUI: user.is_admin ? dashboardTexts[language].admin : dashboardTexts[language].simpleUser,
                });
            }
        }
    }, [editingCardId, users]);

    const handleChange = (field: keyof UserFormValues, value: string | boolean) => {
        setFormValues((prevValues) => ({ ...prevValues, [field]: value }));
    };

    const handleSelectChange = (value: string | boolean) => {
        if (value === dashboardTexts[language].admin) {
            handleChange('isAdmin', true);
            handleChange('isAdmunUI', value);
        } else if (value === dashboardTexts[language].simpleUser) {
            handleChange('isAdmin', false);
            handleChange('isAdmunUI', value);
        }
    };

    const handleCancel = () => {
        setFormValues({
            fullName: '',
            description: '',
            username: '',
            password: '',
            isAdmin: false,
            isAdmunUI: undefined
        });
        setEditingCardId && setEditingCardId(true);
    };

    const handleSave = async () => {
        // Проверка обязательных полей
        if (!formValues.fullName || !formValues.username || !formValues.password || formValues.isAdmunUI === undefined) {
            error(language === 'RU' ? "Пожалуйста заполните все поля" : "Please fill in all fields")
            return;
        }

        if (typeof editingCardId === 'number') {
            const { status, Message, users } = await EditUser(token, editingCardId, formValues, language);
            if (status) {
                if (Message == "Данные успешно изменены" || Message == "Data successfully changed") {
                    success()
                    setNewPassword(formValues.password);
                    setNewUsername(formValues.username);

                    handleCancel()
                    if (users) {
                        setUsers && setUsers(users)
                    }

                } else {
                    error(language === 'RU' ? "Произошла ошибка" : "There was an error")
                }
            } else {
                error(language === 'RU' ? "Произошла ошибка" : "There was an error")
            }
        } else if (typeof editingCardId === 'boolean') {
            const { status, Message, users } = await CreateUser(token, formValues, language);
            if (status) {
                if (Message == "Данные успешно изменены" || Message == "Data successfully changed") {
                    success()
                    setNewPassword(formValues.password);
                    setNewUsername(formValues.username);

                    handleCancel()


                    if (users) {
                        setUsers && setUsers(users)
                    }

                } else {
                    error(language === 'RU' ? "Произошла ошибка" : "There was an error")
                }
            } else {
                error(language === 'RU' ? "Произошла ошибка" : "There was an error")
            }
        }
    };


    const success = () => {
        messageApi.open({
            type: 'success',
            content: language === 'RU' ? "Данные успешно изменены" : "Data successfully changed"
        });
    };
    const error = (content: string) => {
        messageApi.open({
            type: 'error',
            content: content,
        });
    };
    if (editingCardId == null) {
        return (<></>)
    }
    else {

        return (
            <div className={styles.userEdit__div}>
                {contextHolder}
                <div className={styles.userEdit__inputsDiv}>
                    <Input
                        value={formValues.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        placeholder={dashboardTexts[language].fullName}
                        required
                        className={`${styles.userEdit__input} ${styles.inter__medium} ${styles.userFirstName}`}
                    />
                    <Input
                        value={formValues.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder={dashboardTexts[language].description}
                        className={`${styles.userEdit__input} ${styles.inter__medium} ${styles.userFirstName}`}
                    />
                    <Input
                        value={formValues.username}
                        onChange={(e) => handleChange('username', e.target.value)}
                        placeholder={dashboardTexts[language].login}
                        required
                        className={`${styles.userEdit__input} ${styles.inter__medium} ${styles.userFirstName}`}
                    />
                    <Input
                        value={formValues.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        placeholder={dashboardTexts[language].password}
                        required
                        className={`${styles.userEdit__input} ${styles.inter__medium} ${styles.userFirstName}`}
                    />
                    <Select
                        value={formValues.isAdmunUI}
                        placeholder={dashboardTexts[language].isAdmin}
                        className={`${styles.userEdit__inputSmallBorder} ${styles.inter__medium} ${styles.userFirstName}`}
                        onChange={handleSelectChange}
                        options={[
                            { value: dashboardTexts[language].admin, label: dashboardTexts[language].admin },
                            { value: dashboardTexts[language].simpleUser, label: dashboardTexts[language].simpleUser }
                        ]}
                    />
                    <div className={styles.userEdit__buttonsDiv}>
                        <div
                            className={`${styles.users__addUserButton} ${styles.inter__trueMedium} ${styles.userActionsTexts}`}
                            onClick={handleSave}
                        >
                            {dashboardTexts[language].save}
                        </div>
                        <div
                            className={`${styles.users__addUserButton} ${styles.inter__trueMedium} ${styles.userActionsTexts}`}
                            onClick={handleCancel}
                        >
                            {dashboardTexts[language].cancel}
                        </div>
                    </div>
                </div>
                {newUsername && newPassword && <div className={styles.userEdit__copyNewCredentialsDiv}>
                    <p className={`${styles.inter__trueMedium} ${styles.userFirstName} ${styles.userEdit__copyNewCredentialsText}`}>{dashboardTexts[language].userData}</p>
                    <Input suffix={<CopyTwoTone twoToneColor="#335ae6" onClick={() => navigator.clipboard.writeText(`${newUsername}`)} />} className={`${styles.userEdit__input} ${styles.inter__medium} ${styles.userFirstName}`} value={`${dashboardTexts[language].newLogin} ${newUsername}`} />
                    <Input suffix={<CopyTwoTone twoToneColor="#335ae6" onClick={() => navigator.clipboard.writeText(`${newPassword}`)} />} className={`${styles.userEdit__input} ${styles.inter__medium} ${styles.userFirstName}`} value={`${dashboardTexts[language].newPassword} ${newPassword}`} />
                </div>}
            </div>
        );
    }


};

export default UsersFields;