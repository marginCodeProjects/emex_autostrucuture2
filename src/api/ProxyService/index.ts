
import { ProxyFormValues, Proxys } from "../../interfaces/Main"

export async function ExtendProxy(
	token: string|null,
	formValues: ProxyFormValues,language:'RU'|'EN'
): Promise<{
	status: boolean,proxys?:Proxys[],message?:string
}> {
	try {
		const response = await fetch(
			`https://127.0.0.1:8000/v1/proxies/prolong_proxy?date=${formValues.date}&count=${formValues.count}&duration=${formValues.duration}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'access-token': `${token}`,
				},
			}
		)

		if (response.status === 200) {
			const proxys = await response.json()
			return {
					status: true,proxys
			}
		} else if(response.status === 422) {
         
			return {
				status: false,message:language==="RU" ? "Пожалуйста заполните все поля" :"Please fill in all fields"
			}
		}else{
			const proxys = await response.json()
			return {
				status: false,message:proxys.detail
			}
		}
	} catch (error) {
		return {
			status: false
		}
	}
}

export async function BuyProxy(
	token: string|null,
	formValues: ProxyFormValues,language:'RU'|'EN'
): Promise<{
	status: boolean,proxys?:Proxys[],message?:string
}> {
	try {
		const response = await fetch(
			`https://127.0.0.1:8000/v1/proxies/buy_proxy?count=${formValues.count}&duration=${formValues.duration}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'access-token': `${token}`,
				},
			}
		)

		if (response.status === 200) {
			const proxys = await response.json()
			return {
					status: true,proxys
			}
		} else if(response.status === 422) {
         
			return {
				status: false,message:language==="RU" ? "Пожалуйста заполните все поля" :"Please fill in all fields"
			}
		}else{
			const proxys = await response.json()
			return {
				status: false,message:proxys.detail
			}
		}
	} catch (error) {
		return {
			status: false
		}
	}
}
export async function GetProxy(
	token: string|null,
	
): Promise<{
	status: boolean,proxys?:Proxys[],message?:string
}> {
	try {
		const response = await fetch(
			`https://127.0.0.1:8000/v1/proxies/get_proxy_group`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'access-token': `${token}`,
				},
			}
		)

		if (response.ok) {
			const proxys = await response.json()
			return {
					status: true,proxys
			}
		} else {
			const proxys = await response.json() 
			return {
				status: false,message:proxys.detail
			}
		}
	} catch (error) {
		return {
			status: false
		}
	}
}