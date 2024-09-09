import React from 'react'
import styles from './PagePartTitle.module.css'
import { IPagePartTitleProps } from '../../../interfaces/Main'

const PagePartTitle: React.FC<IPagePartTitleProps> = ({ num, label }) => {
    return (<div className={styles.Div}>
        <p className={`${styles.inter_bold} ${styles.Num}`}>{num}</p>
        <p className={`${styles.inter_bold} ${styles.Title}`}>{label}</p>

    </div>
    )
}

export default PagePartTitle