import { useEffect } from 'react';
import useFilters from '../../hooks/UserHooks/filtersHooks';
import { useLanguage } from '../LanguageProvider/LanguageProvider'
import { texts } from '../LanguageProvider/languages'
import styles from './CardScrolling.module.css'
import { Alert } from 'antd';

const CardScrolling = () => {
    const { language } = useLanguage();
    const { filters, loading, error } = useFilters('https://localhost:8000/api/v1/filters/get_filters'); // Замените на свой endpoint
    useEffect(() => {
        console.log(filters, loading, error);

    }, [filters])

    return (
        <>
            {error && <Alert message={error} type="error" showIcon />}
            <div className={styles.OutlineDiv}>
                {!loading &&
                    filters.map((filter) => {
                        return (
                            <div className={styles.Card} key={filter.id}>
                                <div className={styles.Card__topPart}>
                                    <p className={`${styles.inter__medium} ${styles.Card__topPart_title} `}>Название</p>
                                </div>
                                <div className={styles.Cart_bottomPart}>
                                    <p className={`${styles.Card__bottomPart_texts} ${styles.inter__medium}`}>{`${texts[language].filterCardLogo} ${filter.logo}`}</p>
                                    <p className={`${styles.Card__bottomPart_texts} ${styles.inter__medium}`}>{`${texts[language].filterCardDeliveryTime} ${filter.date}`}</p>
                                    <p className={`${styles.Card__bottomPart_texts} ${styles.inter__medium}`}>{`${texts[language].filterCardIsOriginal} ${filter.analog}`}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>

    )
}

export default CardScrolling
