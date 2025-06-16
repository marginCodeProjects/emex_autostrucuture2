import { useState } from 'react'
import useFilters from '../../../hooks/UserHooks/filtersHooks'
import { useAuth } from '../../Other/authContext/useAuth'
import { texts } from '../../Other/LanguageProvider/languages'
import { useLanguage } from '../../Other/LanguageProvider/useLanguage'
import styles from './Filter.module.css'
import { message } from 'antd'

const Proxy = () => {
    const { language } = useLanguage()
    const { token } = useAuth()
    const [selectedCardId, setSelectedCardId] = useState<string | undefined>('')
    const [messageApi, contextHolder] = message.useMessage()

    const { filters, loading } = useFilters(
        'https://api.autostructure.ru/v1/filters/get_filters',
        token,
        language
    )

    const handleSelectCard = (filterId: string) => {
        if (selectedCardId === filterId) {
            setSelectedCardId(undefined)
        } else {
            setSelectedCardId(filterId)
        }
    }

    return (
        <div className={styles.Filters__container}>
            {contextHolder}
            <div className={styles.OutlineDiv}>
                {!loading &&
                    filters?.map((filter) => (
                        <div
                            className={`${styles.Card} ${selectedCardId === filter.id ? styles.Card__active : ''}`}
                            key={filter.id}
                            onClick={() => handleSelectCard(filter.id)}
                        >
                            <div className={styles.Card__topPart}>
                                <p className={`${styles.inter__medium} ${styles.Card__topPart_title}`}>
                                    {filter.title}
                                </p>
                            </div>
                            <div className={styles.Cart_bottomPart}>
                                <p className={`${styles.Card__bottomPart_texts} ${styles.inter__medium}`}>
                                    {filter.logo === null
                                        ? `${texts[language].filterCardLogo} ${texts[language].logoIsNotUsed}`
                                        : `${texts[language].filterCardLogo} - ${filter.logo}`}
                                </p>
                                <p className={`${styles.Card__bottomPart_texts} ${styles.inter__medium}`}>
                                    {filter.is_bigger
                                        ? `${texts[language].filterCardDeliveryTime} > ${filter.date}`
                                        : `${texts[language].filterCardDeliveryTime} < ${filter.date}`}
                                </p>
                                <p className={`${styles.Card__bottomPart_texts} ${styles.inter__medium}`}>
                                    {filter.analog
                                        ? `${texts[language].filterCardIsNotOriginal}`
                                        : `${texts[language].filterCardIsOriginal}`}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Proxy