import AllDataTable from '../../components/HistoryPageComponents/AllDataTable/AllDataTable';
import { useLanguage } from '../../components/Other/LanguageProvider/useLanguage';
import { historyTexts } from '../../components/Other/LanguageProvider/languages';
import PagePartTitle from '../../components/Other/PagePartTitile/PagePartTitle';
import styles from './History.module.css'
import SessionDataTable from '../../components/HistoryPageComponents/SessionDataTable/SessionDataTable';
const History = () => {
  const { language } = useLanguage();
  return (
    <div className={styles.history__container}><PagePartTitle num='1.' label={historyTexts[language].history} />
      <AllDataTable />
      <SessionDataTable />

    </div>
  );
};

export default History;