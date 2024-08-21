import { useState } from "react";
import CardScrolling from "../../components/CardScrolling/CardScrolling";
import { useLanguage } from "../../components/LanguageProvider/LanguageProvider";
import { texts } from "../../components/LanguageProvider/languages";
import styles from "./Main.module.css"
import FileInput from "../../components/FileInput/FileInput";
import PagePartTitle from "../../components/PagePartTitile/PagePartTitle";
import ProcessManagement from "../../components/ProcessManagement/ProcessManagement";
const Main = () => {
  const { language } = useLanguage();
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  return (
    <div className={styles.Main__container}>

      <PagePartTitle num="1." label={texts[language].selectFilter} />
      <CardScrolling selectedCardId={selectedCardId} setSelectedCardId={setSelectedCardId} />
      <PagePartTitle num="2." label={texts[language].uploadingData} />
      <FileInput />
      <PagePartTitle num="3." label={texts[language].processManagement} />
      <ProcessManagement/>
    </div>
  )
}

export default Main;