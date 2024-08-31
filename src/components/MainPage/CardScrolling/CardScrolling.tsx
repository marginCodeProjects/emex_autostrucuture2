import { SetStateAction } from 'react';
import useFilters from '../../../hooks/UserHooks/filtersHooks';
import { useLanguage } from '../../Other/LanguageProvider/useLanguage'
import { texts } from '../../Other/LanguageProvider/languages'
import styles from './CardScrolling.module.css'
import { Alert } from 'antd';
import { useAuth } from '../../Other/authContext/useAuth';
interface ICardScrollingProps {
    setSelectedCardId: React.Dispatch<SetStateAction<string | null>>
    selectedCardId: string | null
}
const CardScrolling: React.FC<ICardScrollingProps> = ({ setSelectedCardId, selectedCardId }) => {
    const { language } = useLanguage();
    const { token } = useAuth();
    const { filters, loading, error } = useFilters('https://127.0.0.1:8000/v1/filters/get_filters', token);


    return (
        <>
            {error && <Alert message={error} type="error" showIcon />}
            <div className={styles.OutlineDiv}>
                {!loading &&
                    filters.map((filter) => {
                        return (
                            <div className={`${styles.Card} ${selectedCardId === filter.id ? styles.Card__active : ''}`} key={filter.id} onClick={() => setSelectedCardId(filter.id)}>
                                <div className={styles.Card__topPart}>
                                    <p className={`${styles.inter__medium} ${styles.Card__topPart_title} `}>{filter.title}</p>
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
