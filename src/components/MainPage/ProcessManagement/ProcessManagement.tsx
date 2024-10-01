import styles from './ProcessManagement.module.css'
import startIcon from '../../../assets/startButtonIcon.svg'
import stopIcon from '../../../assets/stopButtonIcon.svg'
import { IProcessManagementProps } from '../../../interfaces/Main'
import useWebSocket from '../../../hooks/UserHooks/socketHooks'
import { useEffect, useState } from 'react'
import { GetProxyTrafficAvalibale, ParserStart, ParserStop } from '../../../api/ParserService'
import { useLanguage } from '../../Other/LanguageProvider/useLanguage'
import { texts, statusMessages } from '../../Other/LanguageProvider/languages'
import { useAuth } from '../../Other/authContext/useAuth'
import { ConfigProvider, message, Progress } from 'antd'

const ProcessManagement: React.FC<IProcessManagementProps> = ({
	file,
	setFile,
	filterId,
}) => {
	const { language } = useLanguage()
	const { token } = useAuth()
	const [messageApi, contextHolder] = message.useMessage()
	const { status, inputPercent } = useWebSocket()
	const [parsingInProcess, setParsingInProcess] = useState(false)
	const [ProxyTrafficAvalibale, setProxyTrafficAvalibale] = useState<number>()
	useEffect(() => {
		const parsingStatus = localStorage.getItem('parsingInProcess')
		if (parsingStatus === 'true') {
			setParsingInProcess(true)
		}
	}, [])

	useEffect(() => {
		if (
			status == 'Парсер не запущен' ||
			status == 'PARSER_NOT_STARTED_DATA_SAVED'
		) {
			setParsingInProcess(false)
			localStorage.setItem('parsingInProcess', 'false')
		} else {
			setParsingInProcess(true)
			localStorage.setItem('parsingInProcess', 'true')
		}
		const fileName = localStorage.getItem('fileName')
		if (fileName) {
			setFile(fileName)
		}
	}, [status])

	const statusMessage = () => {
		const normalizedStatus = status.trim()

		switch (normalizedStatus) {
			case 'PARSING_COMPLETED':
				return <>{statusMessages[language].PARSING_COMPLETED}</>
			case 'ALL_PROXIES_BANNED':
				return <>{statusMessages[language].ALL_PROXIES_BANNED}</>
			case 'PARSER_NOT_STARTED_DATA_SAVED':
				return (
					<>
						{statusMessages[language].PARSER_NOT_STARTED_DATA_SAVED}
					</>
				)
			case 'PARSER_RUNNING':
				return <>{statusMessages[language].PARSER_RUNNING}</>
			case 'Закончились прокси':
				return <>{statusMessages[language].ALL_PROXY_ARE_BLOCKED}</>
			case 'Парсер не запущен':
				return <>{file}</>
		}
	}
	const errorMessage = (message: string) => {
		messageApi.open({
			type: 'error',
			content: message,
		})
	}
	const successMessage = (message: string) => {
		messageApi.open({
			type: 'success',
			content: message,
		})
	}
	const startParserHandler = async () => {
		if (parsingInProcess) {
			const data = await ParserStop(token, language)
			if (data.success === false) {
				errorMessage(data.message)
			} else if (data.success) {
				setParsingInProcess(false)
				localStorage.setItem('parsingInProcess', 'false')
				successMessage(data.message)
			}
		} else {
			const data = await ParserStart(filterId, token, language)

			if (data.success === false) {
				errorMessage(data.message)
			} else if (data.success) {
				setParsingInProcess(true)
				localStorage.setItem('parsingInProcess', 'true')
				successMessage(data.message)
			}
		}
	}

	const getProxyTraffic = async () => {
		if (parsingInProcess) { // Проверка, чтобы запросы делались только при parsingInProcess == true
			const proxyTraffic = await GetProxyTrafficAvalibale(language)
			return proxyTraffic
		}
	}
	useEffect(() => {
		console.log(ProxyTrafficAvalibale);

	}, [ProxyTrafficAvalibale])

	// Используем useEffect для вызова getProxyTraffic при загрузке и каждые 10 секунд
	useEffect(() => {
		const getBalance = async () => {

			const data = await getProxyTraffic()
			setProxyTrafficAvalibale(data?.AvailableTraffick)

			if (parsingInProcess) {

				const interval = setInterval(() => {
					const getBalanceInterval = async () => {
						const data = await getProxyTraffic()
						setProxyTrafficAvalibale(data?.AvailableTraffick)
					}
					getBalanceInterval()
				}, 10000) // 10000 миллисекунд = 10 секунд
				// Очищаем интервал при размонтировании компонента
				return () => clearInterval(interval)
			}
		}
		getBalance()

	}, [parsingInProcess]) // Интервал будет зависеть от состояния parsingInProcess

	return (
		<ConfigProvider
			theme={{
				components: {
					Progress: {
						circleIconFontSize: "20px"
					},
				},
			}}
		>
			<div>
				{contextHolder}
				{
					<div className={styles.ProcessDiv}>
						<img
							src={parsingInProcess ? stopIcon : startIcon}
							onClick={() => startParserHandler()}
							className={styles.ProcessDiv__StartButton}
						/>
						<div className={styles.ProcessDiv__group}>
							<div className={styles.texts__div}>
								<p
									className={`${styles.inter__medium}${styles.texts}`}
								>
									{statusMessage()}
								</p>
								<p
									className={`${styles.inter__medium} ${styles.texts__red}`}
								>
									{texts[language].Available}
								</p>
							</div>

							<Progress style={{
								margin: "8px auto 0px",
								width: '98%'
							}} percent={inputPercent} percentPosition={{ align: 'start', type: 'outer' }} size="small" />
						</div>
						<p>{ProxyTrafficAvalibale}</p>
					</div>
				}
			</div>
		</ConfigProvider>
	)
}

export default ProcessManagement