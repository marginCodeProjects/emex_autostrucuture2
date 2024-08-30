import AllDataTable from '../../components/AllDataTable/AllDataTable';
import { useLanguage } from '../../components/Other/LanguageProvider/LanguageProvider';
import { historyTexts } from '../../components/Other/LanguageProvider/languages';
import PagePartTitle from '../../components/Other/PagePartTitile/PagePartTitle';
import styles from './History.module.css'
const History = () => {
  const { language } = useLanguage();
  return (
    <div className={styles.History__container}><PagePartTitle num='1.' label={historyTexts[language].history} />
      <AllDataTable />
    
    </div>
  );
};

export default History;