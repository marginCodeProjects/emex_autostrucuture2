import { useEffect, useState } from 'react'
import useFilters from '../../../hooks/UserHooks/filtersHooks'
import { useAuth } from '../../Other/authContext/useAuth'
import { settingsTexts, texts } from '../../Other/LanguageProvider/languages'
import { useLanguage } from '../../Other/LanguageProvider/useLanguage'
import styles from './Filter.module.css'
import Input from 'antd/es/input'
import { message, Select } from 'antd'
import { FilterFormValues } from '../../../interfaces/Main'
import {
    CreateFilter,
    DeleteFilter,
    EditFilter,
} from '../../../api/FilterService'
const Filter = () => {
    const { language } = useLanguage()
    const { token } = useAuth()
    const [messageApi, contextHolder] = message.useMessage()
    const [selectedCardId, setSelectedCardId] = useState<string | undefined>('')
    const [FilterFieldsText, setFilterFieldsText] = useState<FilterFormValues>({
        logo: '',
        deep_analog: 10,
        deep_filter: 10,
        analog: false,
        title: '',
        is_bigger: false,
        date: 10,
    })
    const { filters, loading, setFilters } = useFilters(
        'https://api.autostructure.ru/v1/filters/get_filters',
        token, language
    )
    const handleSelectCard = (filterId: string) => {
        if (selectedCardId == filterId) {
            setSelectedCardId(undefined)
            setFilterFieldsText({
                logo: '',
                deep_analog: 10,
                deep_filter: 10,
                analog: false,
                title: '',
                is_bigger: false,
                date: 10,
            })
        } else {
            setSelectedCardId(filterId)
        }
    }
    const success = (message: string) => {
        messageApi.open({
            type: 'success',
            content: message,
        })
    }
    const error = (message: string) => {
        messageApi.open({
            type: 'error',
            content: message,
        })
    }
    const handleChange = (
        field: keyof FilterFormValues,
        value: string | number | boolean | undefined
    ) => {
        setFilterFieldsText((prevValues) => ({ ...prevValues, [field]: value }))
    }
    useEffect(() => {
        const filter = filters?.find((value) => value.id === selectedCardId)

        if (filter) {
            setFilterFieldsText({
                logo: filter.logo,
                deep_analog: filter.deep_analog ?? 10,
                deep_filter: filter.deep_filter ?? 10,
                analog: filter.analog ?? false,
                title: filter.title ?? '',
                is_bigger: filter.is_bigger ?? false,
                date: filter.date ?? '',
            })
        }
    }, [selectedCardId, filters])
    const handleDeleteFilter = async () => {
        if (selectedCardId) {
            const filters = await DeleteFilter(token, selectedCardId)
            if (filters) {
                setFilters && setFilters(filters)
                success(
                    language === 'RU'
                        ? 'Фильтр успешно удалён'
                        : 'The filter has been successfully removed'
                )
            } else {
                error(
                    language === 'RU'
                        ? 'Произошла ошибка'
                        : 'There was an error'
                )
            }
        }
    }
    const handleFilterAction = async () => {
        if (selectedCardId) {
            const newfilters = await EditFilter(
                token,
                selectedCardId,
                FilterFieldsText,
                language
            )
            if (newfilters.status) {
                setFilters && setFilters(newfilters.Filters)
                success(newfilters.Message)
            } else {
                error(newfilters.Message)
            }
        } else {
            const newfilters = await CreateFilter(
                token,
                FilterFieldsText,
                language
            )
            if (newfilters.status) {
                setFilters && setFilters(newfilters.Filters)
                success(newfilters.Message)
            } else {
                error(newfilters.Message)
            }
        }
    }
    return (
        <div className={styles.Filters__container}>
            {contextHolder}
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
                                onClick={() => handleSelectCard(filter.id)}
                            >
                                <div className={styles.Card__topPart}>
                                    <p
                                        className={`${styles.inter__medium} ${styles.Card__topPart_title} `}
                                    >
                                        {filter.title}
                                    </p>
                                </div>
                                <div className={styles.Cart_bottomPart}>
                                    {filter.logo === null ? (
                                        <p
                                            className={`${styles.Card__bottomPart_texts} ${styles.inter__medium}`}
                                        >{`${texts[language].filterCardLogo} ${texts[language].logoIsNotUsed}`}</p>
                                    ) : (
                                        <p
                                            className={`${styles.Card__bottomPart_texts} ${styles.inter__medium}`}
                                        >{`${texts[language].filterCardLogo} - ${filter.logo}`}</p>
                                    )}
                                    <p
                                        className={`${styles.Card__bottomPart_texts} ${styles.inter__medium}`}
                                    >
                                        {filter.is_bigger
                                            ? `${texts[language].filterCardDeliveryTime} > ${filter.date}`
                                            : `${texts[language].filterCardDeliveryTime} < ${filter.date}`}
                                    </p>
                                    <p
                                        className={`${styles.Card__bottomPart_texts} ${styles.inter__medium}`}
                                    >
                                        {filter.analog
                                            ? `${texts[language].filterCardIsNotOriginal}`
                                            : `${texts[language].filterCardIsOriginal}`}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
            </div>

            <div style={{ display: 'flex' }}>
                <div className={styles.SecondInnerDiv}>
                    <div className={styles.InputsDiv}>
                        <p
                            className={`${styles.InputsLineText} ${styles.inter__medium}`}
                        >
                            {settingsTexts[language].deliveryTime}
                        </p>
                        <Select
                            className={`${styles.ProxyActions__input} ${styles.inter__medium} ${styles.FilterFieldsText}`}
                            value={
                                FilterFieldsText.is_bigger
                                    ? settingsTexts[language].moreThan
                                    : settingsTexts[language].lessThan
                            }
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
                            onChange={(e) =>
                                handleChange('date', e.target.value)
                            }
                            type='number'
                            className={`${styles.ProxyActions__input} ${styles.inter__medium} ${styles.FilterFieldsText}`}
                        />
                    </div>
                    <div className={styles.InputsDiv}>
                        <p
                            className={`${styles.InputsLineText} ${styles.inter__medium}`}
                        >
                            {settingsTexts[language].logo}
                        </p>
                        <Input
                            value={FilterFieldsText.logo}
                            onChange={(e) =>
                                handleChange('logo', e.target.value)
                            }
                            className={`${styles.ProxyActions__input} ${styles.inter__medium} ${styles.FilterFieldsText} ${styles.Card__bottomPart_texts}`}
                        />
                    </div>
                    <div className={styles.InputsDiv}>
                        <p
                            className={`${styles.InputsLineText} ${styles.inter__medium}`}
                        >
                            {settingsTexts[language].original}
                        </p>
                        <Select
                            className={`${styles.ProxyActions__input} ${styles.inter__medium} ${styles.FilterFieldsText}`}
                            onChange={(e) => handleChange('analog', e)}
                            disabled
                            value={
                                FilterFieldsText.analog
                                    ? settingsTexts[language].notOriginals
                                    : settingsTexts[language].originals
                            }
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
                        <p
                            className={`${styles.InputsLineText} ${styles.inter__medium}`}
                        >
                            {settingsTexts[language].depthOfAnalogueSearch}
                        </p>
                        <Input
                            value={FilterFieldsText.deep_analog}
                            onChange={(e) =>
                                handleChange('deep_analog', e.target.value)
                            }
                            type='number'
                            disabled
                            className={`${styles.ProxyActions__input} ${styles.inter__medium} ${styles.FilterFieldsText} ${styles.Card__bottomPart_texts}`}
                        />
                    </div>
                    <div className={styles.InputsDiv}>
                        <p
                            className={`${styles.InputsLineText} ${styles.inter__medium}`}
                        >
                            {
                                settingsTexts[language]
                                    .depthOfSelectionByTheFirstFilter
                            }
                        </p>
                        <Input
                            value={FilterFieldsText.deep_filter}
                            onChange={(e) =>
                                handleChange('deep_filter', e.target.value)
                            }
                            type='number'
                            className={`${styles.ProxyActions__input} ${styles.inter__medium} ${styles.FilterFieldsText} ${styles.Card__bottomPart_texts}`}
                        />
                    </div>
                    <div className={styles.InputsDiv}>
                        <p
                            className={`${styles.InputsLineText} ${styles.inter__medium}`}
                        >
                            {settingsTexts[language].title}
                        </p>
                        <Input
                            value={FilterFieldsText.title}
                            onChange={(e) =>
                                handleChange('title', e.target.value)
                            }
                            className={`${styles.ProxyActions__input} ${styles.inter__medium} ${styles.FilterFieldsText} ${styles.Card__bottomPart_texts}`}
                        />
                    </div>
                </div>
                <div className={styles.ProxyActions__buttonsDiv}>
                    <div
                        onClick={() => handleFilterAction()}
                        className={`${styles.ProxyActions__Button} ${styles.inter__medium} ${styles.Card__bottomPart_texts}`}
                    >
                        {settingsTexts[language].save}
                    </div>
                    <div
                        onClick={() => handleDeleteFilter()}
                        className={`${styles.ProxyActions__Button} ${styles.inter__medium} ${styles.Card__bottomPart_texts}`}
                    >
                        {settingsTexts[language].remove}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter
