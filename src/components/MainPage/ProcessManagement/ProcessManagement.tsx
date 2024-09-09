import styles from './ProcessManagement.module.css'
import startIcon from '../../../assets/startButtonIcon.svg'
import stopIcon from '../../../assets/stopButtonIcon.svg'
import { IProcessManagementProps } from '../../../interfaces/Main'
import useWebSocket from '../../../hooks/UserHooks/socketHooks'
import { useEffect, useState } from 'react'
import { ParserStart, ParserStop } from '../../../api/ParserService'
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
	const { status, inputPercent, percentBannedList } = useWebSocket()
	const [parsingInProcess, setParsingInProcess] = useState(false)
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
									{texts[language].blocked}
								</p>
							</div>

							<Progress style={{
								margin: "8px auto 0px",
								width: '98%'
							}} percent={inputPercent} percentPosition={{ align: 'start', type: 'outer' }} size="small" />
						</div>
						<Progress type="circle" percent={percentBannedList} size={46} strokeColor={'#e53835'} status='exception' />
					</div>
				}
			</div>
		</ConfigProvider >
	)
}

export default ProcessManagement
