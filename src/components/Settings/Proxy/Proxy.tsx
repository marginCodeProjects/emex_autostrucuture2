import { useEffect, useState } from 'react'
import { useAuth } from '../../Other/authContext/useAuth'
import { settingsTexts } from '../../Other/LanguageProvider/languages'
import { useLanguage } from '../../Other/LanguageProvider/useLanguage'
import styles from './Proxy.module.css'
import useFilters from '../../../hooks/UserHooks/filtersHooks'
const Proxy = () => {
    const { language } = useLanguage()
    const { token } = useAuth()
    const [selectedProxyId, setSelectedProxyId] = useState<Number>()
    const { proxys, loading, error } = useFilters('https://api.forprojectstests.ru/v1/proxies/get_proxy_group', token);
    useEffect(() => {
        console.log(proxys);
        console.log(loading);
        console.log(error);



    }, [proxys, loading, error])

    return (
        <div className={styles.Proxy__container}>

            <div className={styles.OutlineDiv}>

                {!loading &&
                    proxys?.map((proxy, index) => {
                        console.log(proxy);

                        return (
                            <div className={`${styles.Card} ${selectedProxyId === index ? styles.Card__active : ''}`} onClick={() => setSelectedProxyId(index)}>
                                <div className={styles.Card__topPart}>
                                    <p className={`${styles.inter__medium} ${styles.Card__topPart_title} `}>{proxy.expired_at}</p>
                                </div>
                                <div className={styles.Cart_bottomPart}>
                                    <p className={`${styles.Card__bottomPart_texts} ${styles.inter__medium}`}>{`${proxy.count} ${settingsTexts[language].proxyInCard}`}</p>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Proxy