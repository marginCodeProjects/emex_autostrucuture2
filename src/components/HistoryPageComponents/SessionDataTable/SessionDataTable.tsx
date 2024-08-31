import { historyTexts } from '../../Other/LanguageProvider/languages'
import { useLanguage } from '../../Other/LanguageProvider/useLanguage'
import styles from './SessionDataTable.module.css'
const SessionDataTable = () => {
    const { language } = useLanguage()
    return (
        <div className={styles.Table}>
            <div className={styles.TableRow}>
                <div className={styles.TableColumn}>{historyTexts[language].article}</div>
                <div className={styles.TableColumn}>{historyTexts[language].name}</div>
                <div className={styles.TableColumn}>{historyTexts[language].brand}</div>
                <div className={styles.TableColumn}>{historyTexts[language].article1}</div>
                <div className={styles.TableColumn}>{historyTexts[language].quantity}</div>
                <div className={styles.TableColumn}>{historyTexts[language].price}</div>
                <div className={styles.TableColumn}>{historyTexts[language].batch}</div>
                <div className={styles.TableColumn}>{historyTexts[language].newPrice}</div>
                <div className={styles.TableColumn}>{historyTexts[language].bestPrice}</div>
                <div className={styles.TableColumn}>{historyTexts[language].logo}</div>
                <div className={styles.TableColumn}>{historyTexts[language].deliveryTime}</div>
            </div>
            <div className={styles.TableRow}>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
            </div>
            <div className={styles.TableRow}>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
            </div>
            <div className={styles.TableRow}>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
            </div>
            <div className={styles.TableRow}>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
            </div>
            <div className={styles.TableRow}>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
            </div>
            <div className={styles.TableRow}>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
            </div>
            <div className={styles.TableRow}>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>1</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
                <div className={styles.TableColumn}>2</div>
            </div>
        </div>
    )
}

export default SessionDataTable