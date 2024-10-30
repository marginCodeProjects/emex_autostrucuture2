import AllDataTable from '../../components/HistoryPageComponents/AllDataTable/AllDataTable';
import { useLanguage } from '../../components/Other/LanguageProvider/useLanguage';
import { historyTexts } from '../../components/Other/LanguageProvider/languages';
import PagePartTitle from '../../components/Other/PagePartTitile/PagePartTitle';
import styles from './History.module.css'
import SessionDataTable from '../../components/HistoryPageComponents/SessionDataTable/SessionDataTable';
import { useState } from 'react';


const History = () => {
  const { language } = useLanguage();
  const [fileName, setFileName] = useState<string | undefined>()
  return (
    <div className={styles.history__container}><PagePartTitle num='1.' label={historyTexts[language].history} />
      <AllDataTable setFileName={setFileName} />
      {fileName &&
        <SessionDataTable fileName={fileName} />
      }
    </div>
  );
};

export default History;