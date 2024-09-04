import { settingsTexts } from '../../components/Other/LanguageProvider/languages'
import { useLanguage } from '../../components/Other/LanguageProvider/useLanguage'
import PagePartTitle from '../../components/Other/PagePartTitile/PagePartTitle'
import Filter from '../../components/Settings/Filter/Filter'
import Proxy from '../../components/Settings/Proxy/Proxy'
import styles from './Settings.module.css'

const Settings = () => {
	const { language } = useLanguage()
	return (
		<div className={styles.settings__container}>
			<PagePartTitle num='1.' label={settingsTexts[language].PROXY} />
			<Proxy />{' '}
			<PagePartTitle
				num='2.'
				label={settingsTexts[language].FILTERS}
			/>{' '}
			<Filter />
		</div>
	)
}

export default Settings
