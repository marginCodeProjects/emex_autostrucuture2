import { FormProps } from 'antd';
import { NavigateFunction } from 'react-router-dom';
import {  IUserLogin } from '../../interfaces/Main'


  

export async function handleLogout(
    setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>,token:string|null,
	onLogoutSuccess: () => void
) {
    try {
        const { success, message } = await UserLogout(token)
        if (success) {
            onLogoutSuccess()
        } else {
            setErrorMessage(message)
        }
    } catch (error) {
        setErrorMessage('Произошла ошибка')
    }
}


export async function UserLogin(
	data: IUserLogin
): Promise<{ success: boolean; message: string,username:string,token:string,is_admin:boolean }> {
	try {
		const response = await fetch(
			'https://127.0.0.1:8000/v1/users/login',
			{
				method: 'POST',
				body: JSON.stringify({
					username: data.username,
					password: data.password,
				}),
				headers: {
					'Content-Type': 'application/json',
				
				},
		
			}
		)

		if (response.ok) {
			const userInfo = await response.json()
		console.log(userInfo.is_admin)
		
			
			return { success: true, message: 'Успешный вход',username: userInfo.username,token:userInfo.access_token,is_admin:userInfo.is_admin }
		} else {
			let errorMessage = 'Ошибка входа'

			if (response.status === 404) {
				errorMessage = 'Неправильный логин'
			} else if (response.status === 401) {
				errorMessage = 'Доступ запрещен'
			}

			return { success: false, message: errorMessage ,username:'',token:'',is_admin:false}
		}
	} catch (error) {
		return { success: false, message: 'Ошибка сети или сервера',username:'',token:'',is_admin:false }
	}
}




// Функция onFinish
export const onFinish = (
	login:(username:string,token:string,isAdmin:boolean) => void,navigate: NavigateFunction,
	setErrorMessage: (message: string | null) => void
): FormProps<IUserLogin>['onFinish'] => async (values) => {
	
	const result = await UserLogin(values);

  if (result.success) {
    login(result.username,result.token,result.is_admin)
    navigate('/'); // Перенаправление после успешного логина
  } else {
    setErrorMessage(result.message);
  }
};

// Функция onFinishFailed
export const onFinishFailed = (): FormProps<IUserLogin>['onFinishFailed'] => (errorInfo) => {
  console.log('Failed:', errorInfo);
};
export async function UserLogout(token:string|null): Promise<{
	success: boolean
	message?: string
}> {
	
	try {
		const response = await fetch(
			'https://127.0.0.1:8000/v1/users/logout',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				'access-token':`${token}`
				},
				
			}
		)

		if (response.ok) {
			localStorage.removeItem("token")
			return { success: true }
		} else {
			const errorMessage = 'Ошибка выхода'

			return { success: false, message: errorMessage }
		}
	} catch (error) {
		return { success: false, message: 'Ошибка сети или сервера' }
	}
}
