import { useEffect, useState } from 'react'
import { useAuth } from '../../Other/authContext/useAuth'
import { settingsTexts } from '../../Other/LanguageProvider/languages'
import { useLanguage } from '../../Other/LanguageProvider/useLanguage'
import styles from './Proxy.module.css'
import { ProxyFormValues, Proxys } from '../../../interfaces/Main'
import { Input, message, Select } from 'antd'
import { BuyProxy, ExtendProxy, GetProxy } from '../../../api/ProxyService'
const Proxy = () => {
    const { language } = useLanguage()
    const { token } = useAuth()
    const [messageApi, contextHolder] = message.useMessage();
    const [selectedProxyId, setSelectedProxyId] = useState<Number>()
    const [proxys, setProxys] = useState<Proxys[]>([])
    const [formValues, setFormValues] = useState<ProxyFormValues>({
        date: '',
        duration: undefined,
        count: undefined,
    })
    useEffect(() => {

        const getProxy = async () => {
            const data = await GetProxy(token)
            if (data.status && data.proxys) {
                setProxys(data.proxys)
            } else {
                error(language === 'RU' ? "Произошла ошибка" : 'There was an error')
            }

        }
        getProxy()
    }, [])

    const handleChange = (
        field: keyof ProxyFormValues,
        value: string | number
    ) => {
        setFormValues((prevValues) => ({ ...prevValues, [field]: value }))
    }
    const handleSelectProxy = (index: number) => {
        // Если текущий индекс уже выбран, сбрасываем в undefined
        if (selectedProxyId === index) {
            setSelectedProxyId(undefined);
            handleChange('count', '');
            handleChange('date', '');
        } else {
            // В противном случае устанавливаем новый индекс
            let count = 0;
            let date = ''
            if (proxys) {
                count = proxys[index].count;
                date = proxys[index].expired_at
            }
            setSelectedProxyId(index);
            handleChange('count', count);
            handleChange('date', date);

        }
    };
    const success = () => {
        messageApi.open({
            type: 'success',
            content: language === 'RU' ? 'Прокси успешно куплены' : 'The proxies have been successfully purchased',
        });
    };
    const error = (message: string) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };
    const ProxyAction = () => {
        if (typeof selectedProxyId === "number") {


            (async () => {
                const data = await ExtendProxy(token, formValues,language);
                if (data.status && data.proxys) {
                    success();

                    setProxys(data.proxys);

                } else if (data.message) {
                    error(data.message);
                } else {
                    error(language === 'RU' ? "Произошла ошибка" : 'There was an error')
                }
            })();
        } else {

            (async () => {
                const data = await BuyProxy(token, formValues,language);
                if (data.status && data.proxys) {
                    success();

                    setProxys(data.proxys);
                } else if (data.message) {
                    error(data.message);
                } else {
                    error(language === 'RU' ? "Произошла ошибка" : 'There was an error')
                }
            })();
        }
    };
    return (
        <div className={styles.Proxy__container}>
            {contextHolder}
            <div className={styles.OutlineDiv}>
                {
                    proxys?.map((proxy, index) => {


                        return (
                            <div key={index}
                                className={`${styles.Card} ${selectedProxyId === index
                                    ? styles.Card__active
                                    : ''
                                    }`}
                                onClick={() => handleSelectProxy(index)}
                            >
                                <div className={styles.Card__topPart}>
                                    <p
                                        className={`${styles.inter__medium} ${styles.Card__topPart_title} `}
                                    >
                                        {proxy.expired_at.split("T")[0]}
                                    </p>
                                </div>
                                <div className={styles.Cart_bottomPart}>
                                    <p
                                        className={`${styles.Card__bottomPart_texts} ${styles.inter__medium}`}
                                    >{`${proxy.count} ${settingsTexts[language].proxyInCard}`}</p>
                                </div>
                            </div>
                        )
                    })}
            </div>
            <div className={styles.ProxyActions__inputsDiv}>
                {' '}
                <Input
                    value={formValues.count}
                    onChange={(e) => handleChange('count', e.target.value)}
                    placeholder={settingsTexts[language].quantity}
                    disabled={selectedProxyId !== undefined}
                    className={`${styles.ProxyActions__input} ${styles.inter__medium} ${styles.FilterFieldsText}`}
                />
                <Select
                    value={formValues.duration}
                    placeholder={settingsTexts[language].duration}
                    className={`${styles.ProxyActions__input} ${styles.inter__medium} ${styles.FilterFieldsText}`}
                    onChange={(e) => handleChange('duration', e)}
                    options={[
                        {
                            value: 30,
                            label: 30,
                        },
                        {
                            value: 60,
                            label: 60,
                        },
                        {
                            value: 90,
                            label: 90,
                        },
                        {
                            value: 180,
                            label: 180,
                        },
                        {
                            value: 360,
                            label: 360,
                        },
                    ]}
                />{' '}
                <div className={styles.ProxyActions__buttonsDiv}>
                    <div
                        className={`${styles.ProxyActions__Button} ${styles.inter__medium} ${styles.userActionsTexts}`} onClick={() => ProxyAction()}
                    >
                        {settingsTexts[language].toExtend}
                    </div>
                    <div
                        className={`${styles.ProxyActions__Button} ${styles.inter__medium} ${styles.userActionsTexts}`}
                    >
                        {settingsTexts[language].remove}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Proxy
