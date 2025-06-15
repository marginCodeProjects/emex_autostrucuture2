import styles from './ProcessManagement.module.css'
import startIcon from '../../../assets/startButtonIcon.svg'
import stopIcon from '../../../assets/stopButtonIcon.svg'
import { IProcessManagementProps } from '../../../interfaces/Main'
import useWebSocket from '../../../hooks/UserHooks/socketHooks'
import { useEffect, useState } from 'react'
import { GetBrightProxyTrafficAvailable, GetMangoProxyTrafficAvailable, ParserStart, ParserStop } from '../../../api/ParserService'
import { useLanguage } from '../../Other/LanguageProvider/useLanguage'
import { texts, statusMessages } from '../../Other/LanguageProvider/languages'
import { useAuth } from '../../Other/authContext/useAuth'
import { ConfigProvider, message, Progress } from 'antd'
import { useProxySource } from '../../ProxySourceProvider/ProxySourceProvider'
import { GetFilterByID } from '../../../api/FilterService'
import { GetAllAvailableProxy } from '../../../api/ProxyService'

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
	const { proxySource } = useProxySource()
	const [ProxyTrafficAvalibale, setProxyTrafficAvalibale] = useState<string>()
	const [isLoading, setIsLoading] = useState(true)
	const [filterName, setFilterName] = useState<string | null>(null)
	const [selectedProxySource, setSelectedProxySource] = useState<string | null>(localStorage.getItem("selectedProxySource"));
	const [availibleBrightDataProxies, setAvailibleBrightDataProxies] = useState<GetAllAvailableProxy | null>(null)
	useEffect(() => {
		const parsingStatus = localStorage.getItem('parsingInProcess')


		if (parsingStatus === 'true') {
			setParsingInProcess(true)
		}
		setIsLoading(false)
	}, [])



	useEffect(() => {
		const fetchFilter = async () => {
			const response = await GetFilterByID(token, localStorage.getItem("selectedFilterId"), language)
			setFilterName(response.Filter?.title ?? "Неизвестный фильтр")
		}

		fetchFilter()
	}, [parsingInProcess])

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
			const data = await ParserStop(token, language);
			if (data.success === false) {
				errorMessage(data.message);
			} else if (data.success) {
				setParsingInProcess(false);
				localStorage.setItem('parsingInProcess', 'false');
				successMessage(data.message);
			}
		} else {
			const data = await ParserStart(filterId, token, proxySource, language);
			if (data.success === false) {
				errorMessage(data.message);
			} else if (data.success) {
				setParsingInProcess(true);
				localStorage.setItem('parsingInProcess', 'true');

				if (filterId) {
					localStorage.setItem('selectedFilterId', filterId);
				}
				localStorage.setItem('selectedProxySource', proxySource);
				setSelectedProxySource(proxySource); // Обновляем состояние
				successMessage(data.message);

				// Обновляем фильтр сразу после старта парсинга
				const response = await GetFilterByID(token, filterId, language);
				setFilterName(response.Filter?.title ?? "Неизвестный фильтр");
			}
		}
	};


	const fetchTraffic = async () => {


		if (proxySource === "MANGO") {
			console.log("Я сработал манго");
			const data = await GetMangoProxyTrafficAvailable(language)
			if (data?.availableTraffic) {
				const availableTrafficGB = (data.availableTraffic / 1024).toFixed(1)
				const suffix = language === "RU" ? ' ГБ' : ' GB'
				setProxyTrafficAvalibale(availableTrafficGB + suffix)
			}

		} else if (proxySource === "BRIGHTDATA") {
			console.log("Я сработал брайт");
			const data = await GetBrightProxyTrafficAvailable(language)
			console.log(data);
			if (data.balance && data.pendingCosts) {
				const availableTrafficGB = ((data.balance - data.pendingCosts) / 0.6).toFixed(1)
				const suffix = language === "RU" ? ' ГБ' : ' GB'
				setProxyTrafficAvalibale(availableTrafficGB + suffix)
			}
		}

	}
	useEffect(() => {
		if (proxySource === "BRIGHTDATA") {
			const setProxies = async () => {
				console.log("Сработал");

				const allAvailableProxy = await GetAllAvailableProxy(language)
				setAvailibleBrightDataProxies(allAvailableProxy)
			}
			setProxies()
		}
	}, [parsingInProcess, language, isLoading, proxySource])
	useEffect(() => {
		fetchTraffic()
		const interval = parsingInProcess ? setInterval(fetchTraffic, 30000) : null
		return () => {
			if (interval) clearInterval(interval)
		}
	}, [parsingInProcess, language, isLoading, proxySource])


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
				<div className={styles.ProcessDiv}>
					<div style={{ display: 'flex', marginBottom: "12px" }}>
						<img
							src={parsingInProcess ? stopIcon : startIcon}
							onClick={startParserHandler}
							className={styles.ProcessDiv__StartButton}
						/>
						<div className={styles.ProcessDiv__group}>
							<div className={styles.texts__div}>
								<p className={`${styles.inter__medium}${styles.texts}`}>
									{statusMessage()}
								</p>
								<p className={`${styles.inter__medium} ${styles.texts__red}`} style={{ height: '35px' }}>
									{texts[language].Available}
								</p>
							</div>

							<Progress
								style={{ margin: "-8px auto 0px", width: '98%' }}
								percent={inputPercent}
								percentPosition={{ align: 'start', type: 'outer' }}
								size="small"
							/>
						</div>
						<p className={`${styles.inter__medium} ${styles.texts__red}`} style={{ fontSize: "15px" }}>{ProxyTrafficAvalibale}</p>
					</div>
					{parsingInProcess && (
						<div style={{ display: 'flex', flexDirection: 'column', padding: '12px 0px' }}>
							<p className={`${styles.inter__medium} ${styles.texts} ${styles.text_minify}`}>
								{texts[language].proxyInUse} {selectedProxySource}
							</p>
							<p className={`${styles.inter__medium} ${styles.texts} ${styles.text_minify}`}>
								{texts[language].currentFilter} {filterName}
							</p>
						</div>
					)}
					{availibleBrightDataProxies?.proxies?.map((proxy) => (
						<div
							key={proxy.name} // <-- важно для map
							style={{
								height: "100%",
								display: "flex",
								alignItems: "center",
								overflowX: "scroll",
							}}
						>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									minWidth: "120px",
									height: "50px",
									borderRadius: "10px",
									border: "1px solid #335ae6",
									justifyContent: "center",
									marginRight: "12px",
								}}
							>
								<p className={`${styles.inter__medium} ${styles.texts} ${styles.text_minify}`}>
									{proxy.name}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</ConfigProvider>
	)
}

export default ProcessManagement






