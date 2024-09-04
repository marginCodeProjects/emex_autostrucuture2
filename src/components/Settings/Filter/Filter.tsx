import { useEffect, useState } from 'react'
import useFilters from '../../../hooks/UserHooks/filtersHooks'
import { useAuth } from '../../Other/authContext/useAuth'
import { settingsTexts, texts } from '../../Other/LanguageProvider/languages'
import { useLanguage } from '../../Other/LanguageProvider/useLanguage'
import styles from './Filter.module.css'
import Input from 'antd/es/input'
import { Select } from 'antd'
import { FilterFormValues } from '../../../interfaces/Main'
const Filter = () => {
    const { language } = useLanguage()
    const { token } = useAuth()
    const [selectedCardId, setSelectedCardId] = useState<string>('')
    const { filters, loading, error, setFilters } = useFilters(
        'https://127.0.0.1:8000/v1/filters/get_filters',
        token
    )
    const [FilterFieldsText, setFilterFieldsText] = useState<FilterFormValues>({ logo: '', deep_analog: 10, deep_filter: 10, analog: false, title: '', is_bigger: false, date: 0 })
    const handleChange = (
        field: keyof FilterFormValues,
        value: string | number | boolean | undefined
    ) => {
        setFilterFieldsText((prevValues) => ({ ...prevValues, [field]: value }))
    }
    useEffect(() => {
        const filter = filters?.find((value) => value.id === selectedCardId)
        handleChange('analog', filter?.analog)
        handleChange('date', filter?.date)
        handleChange('deep_analog', filter?.deep_analog)
        handleChange('deep_filter', filter?.deep_filter)
        handleChange('is_bigger', filter?.is_bigger)
        handleChange('logo', filter?.logo)
        handleChange('title', filter?.title)

    }, [selectedCardId])

    return (
        <div className={styles.Filters__container}>

            <div className={styles.OutlineDiv}>
                {!loading &&
                    filters?.map((filter) => {
                        return (
                            <div
                                className={`${styles.Card} ${selectedCardId === filter.id
                                    ? styles.Card__active
                                    : ''
                                    }`}
                                key={filter.id}
                                onClick={() => setSelectedCardId(filter.id)}
                            >
                                <div className={styles.Card__topPart}>
                                    <p
                                        className={`${styles.inter__medium} ${styles.Card__topPart_title} `}
                                    >
                                        {filter.title}
                                    </p>
                                </div>
                                <div className={styles.Cart_bottomPart}>
                                    <p
                                        className={`${styles.Card__bottomPart_texts} ${styles.inter__medium}`}
                                    >{`${texts[language].filterCardLogo} ${filter.logo}`}</p>
                                    <p
                                        className={`${styles.Card__bottomPart_texts} ${styles.inter__medium}`}
                                    >{`${texts[language].filterCardDeliveryTime} ${filter.date}`}</p>
                                    <p
                                        className={`${styles.Card__bottomPart_texts} ${styles.inter__medium}`}
                                    >{`${texts[language].filterCardIsOriginal} ${filter.analog}`}</p>
                                </div>
                            </div>
                        )
                    })}
            </div>
            <div className={styles.SecondInnerDiv}>
                <div className={styles.InputsDiv}>
                    <p className={`${styles.InputsLineText} ${styles.inter__medium}`}>{settingsTexts[language].deliveryTime}</p>
                    <Select
                        className={`${styles.ProxyActions__input} ${styles.inter__medium} ${styles.FilterFieldsText}`}
                        value={FilterFieldsText.is_bigger ? settingsTexts[language].moreThan : settingsTexts[language].lessThan}
                        onChange={(e) => handleChange('is_bigger', e)}
                        options={[
                            {
                                value: true,
                                label: settingsTexts[language].moreThan,
                            },
                            {
                                value: false,
                                label: settingsTexts[language].lessThan,
                            },

                        ]}
                    />{' '}
                    <Input
                        value={FilterFieldsText.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                        type="number"

                        className={`${styles.ProxyActions__input} ${styles.inter__medium} ${styles.FilterFieldsText}`}
                    />
                </div>
                <div className={styles.InputsDiv}>
                    <p className={`${styles.InputsLineText} ${styles.inter__medium}`}>{settingsTexts[language].logo}</p>
                    <Input
                        value={FilterFieldsText.logo}
                        onChange={(e) => handleChange('logo', e.target.value)}

                        className={`${styles.ProxyActions__input} ${styles.inter__medium} ${styles.FilterFieldsText} ${styles.Card__bottomPart_texts}`}
                    />
                </div>
                <div className={styles.InputsDiv}>
                    <p className={`${styles.InputsLineText} ${styles.inter__medium}`}>{settingsTexts[language].original}</p>
                    <Select
                        className={`${styles.ProxyActions__input} ${styles.inter__medium} ${styles.FilterFieldsText}`}
                        onChange={(e) => handleChange('analog', e)}
                        value={FilterFieldsText.analog ? settingsTexts[language].notOriginals : settingsTexts[language].originals}
                        options={[
                            {
                                value: false,
                                label: settingsTexts[language].originals,
                            },
                            {
                                value: true,
                                label: settingsTexts[language].notOriginals,
                            },

                        ]}
                    />{' '}
                </div>
                <div className={styles.InputsDiv}>
                    <p className={`${styles.InputsLineText} ${styles.inter__medium}`}>{settingsTexts[language].depthOfAnalogueSearch}</p>
                    <Input
                        value={FilterFieldsText.deep_analog}
                        onChange={(e) => handleChange('deep_analog', e.target.value)}

                        type='number'
                        className={`${styles.ProxyActions__input} ${styles.inter__medium} ${styles.FilterFieldsText} ${styles.Card__bottomPart_texts}`}
                    />
                </div>
                <div className={styles.InputsDiv}>
                    <p className={`${styles.InputsLineText} ${styles.inter__medium}`}>{settingsTexts[language].depthOfSelectionByTheFirstFilter}</p>
                    <Input
                        value={FilterFieldsText.deep_filter}
                        onChange={(e) => handleChange("deep_filter", e.target.value)}
                        placeholder={settingsTexts[language].logo}
                        type='number'
                        className={`${styles.ProxyActions__input} ${styles.inter__medium} ${styles.FilterFieldsText} ${styles.Card__bottomPart_texts}`}
                    />
                </div>
                <div className={styles.InputsDiv}>
                    <p className={`${styles.InputsLineText} ${styles.inter__medium}`}>{settingsTexts[language].title}</p>
                    <Input
                        value={FilterFieldsText.title}
                        onChange={(e) => handleChange("title", e.target.value)}


                        className={`${styles.ProxyActions__input} ${styles.inter__medium} ${styles.FilterFieldsText} ${styles.Card__bottomPart_texts}`}
                    />
                </div>
            </div>
        </div>

    )
}

export default Filter
