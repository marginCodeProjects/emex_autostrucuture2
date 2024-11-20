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
  const [fileType, setFileType] = useState<null | 'filename_after_parsing' | 'filename_after_parsing_without_nds' | 'filename_after_parsing_with_nds'>(null)
  return (
    <div className={styles.history__container}><PagePartTitle num='1.' label={historyTexts[language].history} />
      <AllDataTable setFileName={setFileName} setFileType={setFileType} />
      {fileName &&
        <SessionDataTable fileName={fileName} fileType={fileType} />
      }
    </div>
  );
};

export default History;