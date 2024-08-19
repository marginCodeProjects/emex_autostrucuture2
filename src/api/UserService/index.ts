import { FormProps } from 'antd';
import { NavigateFunction } from 'react-router-dom';
import { IUserLogin } from '../../interfaces/Users'



export async function handleLogout(
    setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>,
	onLogoutSuccess: (isSuccess:boolean) => void
) {
    try {
        const { success, message } = await UserLogout()
        if (success) {
            onLogoutSuccess(false)
        } else {
            setErrorMessage(message)
        }
    } catch (error) {
        setErrorMessage('Произошла ошибка')
    }
}


export async function UserLogin(
	data: IUserLogin
): Promise<{ success: boolean; message: string }> {
	try {
		const response = await fetch(
			'https://api.forprojectstests.ru/v1/users/login',
			{
				method: 'POST',
				body: JSON.stringify({
					username: data.username,
					password: data.password,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			}
		)

		if (response.ok) {
			return { success: true, message: 'Успешный вход' }
		} else {
			let errorMessage = 'Ошибка входа'

			if (response.status === 404) {
				errorMessage = 'Неправильный логин'
			} else if (response.status === 401) {
				errorMessage = 'Доступ запрещен'
			}

			return { success: false, message: errorMessage }
		}
	} catch (error) {
		return { success: false, message: 'Ошибка сети или сервера' }
	}
}

// Функция onFinish
export const onFinish = (
  onLoginSuccess: (status: boolean) => void,
  navigate: NavigateFunction,
  setErrorMessage: (message: string | null) => void
): FormProps<IUserLogin>['onFinish'] => async (values) => {
  const result = await UserLogin(values);

  if (result.success) {
    onLoginSuccess(true);
    navigate('/'); // Перенаправление после успешного логина
  } else {
    setErrorMessage(result.message);
  }
};

// Функция onFinishFailed
export const onFinishFailed = (): FormProps<IUserLogin>['onFinishFailed'] => (errorInfo) => {
  console.log('Failed:', errorInfo);
};
export async function UserLogout(): Promise<{
	success: boolean
	message?: string
}> {
	try {
		const response = await fetch(
			'https://api.forprojectstests.ru/v1/users/logout',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			}
		)

		if (response.ok) {
			return { success: true }
		} else {
			let errorMessage = 'Ошибка выхода'

			return { success: false, message: errorMessage }
		}
	} catch (error) {
		return { success: false, message: 'Ошибка сети или сервера' }
	}
}
