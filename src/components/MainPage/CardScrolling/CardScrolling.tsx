import { useEffect } from 'react';
import useFilters from '../../../hooks/UserHooks/filtersHooks';
import { useLanguage } from '../../Other/LanguageProvider/useLanguage'
import { texts } from '../../Other/LanguageProvider/languages'
import styles from './CardScrolling.module.css'
import { message } from 'antd';
import { useAuth } from '../../Other/authContext/useAuth';
import { ICardScrollingProps } from '../../../interfaces/Main';

const CardScrolling: React.FC<ICardScrollingProps> = ({ setSelectedCardId, selectedCardId }) => {
    const { language } = useLanguage();
    const { token } = useAuth();
    const { filters, loading, error } = useFilters('https://127.0.0.1:8000/v1/filters/get_filters', token, language);
    const [messageApi, contextHolder] = message.useMessage();
    const errorMessage = () => {
        messageApi.open({
            type: 'error',
            content: language === 'RU' ? "При загрузке фильтров произошла ошибка" : 'An error occurred while loading filters'
        });
    };
    useEffect(() => {
        if (error != null) {

            errorMessage()
        }
    }, [error])
    const handleSelectCard = (filterId: string) => {
        if (selectedCardId == filterId) {
            setSelectedCardId(null)

        } else {
            setSelectedCardId(filterId)
        }
    }


    return (
        <>

            <div className={styles.OutlineDiv}>
                {contextHolder}
                {!loading &&
                    filters?.map((filter) => {
                        return (
                            <div className={`${styles.Card} ${selectedCardId === filter.id ? styles.Card__active : ''}`} key={filter.id} onClick={() => handleSelectCard(filter.id)}>
                                <div className={styles.Card__topPart}>
                                    <p className={`${styles.inter__medium} ${styles.Card__topPart_title} `}>{filter.title}</p>
                                </div>
                                <div className={styles.Cart_bottomPart}>
                                    {filter.logo === null ?
                                        <p className={`${styles.Card__bottomPart_texts} ${styles.inter__medium}`}>{`${texts[language].filterCardLogo} ${texts[language].logoIsNotUsed}`}</p>
                                        : <p className={`${styles.Card__bottomPart_texts} ${styles.inter__medium}`}>{`${texts[language].filterCardLogo} - ${filter.logo}`}</p>}
                                    <p className={`${styles.Card__bottomPart_texts} ${styles.inter__medium}`}>{filter.is_bigger ? `${texts[language].filterCardDeliveryTime} > ${filter.date}` : `${texts[language].filterCardDeliveryTime} < ${filter.date}`}</p>
                                    <p className={`${styles.Card__bottomPart_texts} ${styles.inter__medium}`}>{filter.analog ? `${texts[language].filterCardIsNotOriginal}` : `${texts[language].filterCardIsOriginal}`}</p>
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
