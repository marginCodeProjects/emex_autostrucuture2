import CardScrolling from "../../components/CardScrolling/CardScrolling";
import { useLanguage } from "../../components/LanguageProvider/LanguageProvider";
import { texts } from "../../components/LanguageProvider/languages";
import styles from "./Main.module.css"
const Main = () => {
  const { language } = useLanguage();
  return (
    <div className={styles.Main__container}>
      <h3 className={`${styles.inter_bold} ${styles.Main__blockTitles}`}>{texts[language].selectFilter}</h3>
      <CardScrolling />
    </div>
  )
}

export default Main;