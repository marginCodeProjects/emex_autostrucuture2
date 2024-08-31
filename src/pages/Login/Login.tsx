import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { Button, Form, Input, Alert } from 'antd';
import { onFinish, onFinishFailed, } from '../../api/UserService';
import { IUserLogin } from '../../interfaces/Main';
import { useAuth } from '../../components/Other/authContext/useAuth';


const Login: React.FC = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { login } = useAuth();

    return (
        <div className={styles.login__div}>
            <p className={styles.inter_semibold}>Авторизация</p>
            {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 600, width: '100%' }}
                onFinish={onFinish(login, navigate, setErrorMessage)}
                onFinishFailed={onFinishFailed}
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