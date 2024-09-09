import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { Button, Form, Input, message } from 'antd';
import { onFinish, } from '../../api/UserService';
import { IUserLogin } from '../../interfaces/Main';
import { useAuth } from '../../components/Other/authContext/useAuth';
import { useLanguage } from '../../components/Other/LanguageProvider/useLanguage';


const Login: React.FC = () => {
    const navigate = useNavigate();
    const { language } = useLanguage()
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { login } = useAuth();
    const [messageApi, contextHolder] = message.useMessage();
    const error = (message: string) => {
        messageApi.open({
            type: 'error',
            content: message
        });
    };
    useEffect(() => {
        if (errorMessage) {
            error(errorMessage)
        }
    }, [errorMessage])

    return (
        <div className={styles.login__div}>
            {contextHolder}
            <p className={styles.inter_semibold}>Авторизация</p>
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 600, width: '100%' }}
                onFinish={onFinish(login, navigate, setErrorMessage, language)}

                autoComplete="off"
            >
                <Form.Item<IUserLogin>
                    label="Имя пользователя"
                    name="username"
                    rules={[{ required: true, message: 'Пожалуйста, введите ваше имя пользователя!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<IUserLogin>
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;