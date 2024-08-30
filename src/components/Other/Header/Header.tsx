import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import { Alert, Switch } from 'antd'
import { useLanguage } from '../../Other/LanguageProvider/LanguageProvider'
import { texts } from '../../Other/LanguageProvider/languages'
import { useState } from 'react';
import { handleLogout } from '../../../api/UserService'
import { IHeaderProps } from '../../../interfaces/Main';
import logo from '../../assets/logo.svg';
import { useAuth } from '../authContext/authContext'
const Header: React.FC<IHeaderProps> = ({ onLogoutSuccess, username }) => {
  const { language, toggleLanguage } = useLanguage();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const { token, isAdmin } = useAuth();
  function logoutHandler() {
    handleLogout(setErrorMessage, token, onLogoutSuccess)
  }
  return (
    <nav className={styles.header}>
      {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
      <img
        src={logo}
        className={styles.header__logo}
      />
      <div className={styles.header__justifyDiv}>
        <ul className={styles.header__nav}>
          <li
            className={`${styles.header__navText} ${styles.inter__medium} `}
          >
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? styles.active : ''
              }
              end
            >
              {texts[language].home}
            </NavLink>
          </li>
          <li
            className={`${styles.header__navText} ${styles.inter__medium} `}
          >
            <NavLink
              to='/about'
              className={({ isActive }) =>
                isActive ? styles.active : ''
              }
            >
              {texts[language].history}
            </NavLink>
          </li>
          <li
            className={`${styles.header__navText} ${styles.inter__medium} `}
          >
            <NavLink
              to='/contact'
              className={({ isActive }) =>
                isActive ? styles.active : ''
              }
            >
              {texts[language].settings}
            </NavLink>
          </li>
        </ul>
        <div className={styles.header__controlPanel}>
          <Switch
            className={styles.header__controlPanel__item}
            checkedChildren='ENG'
            unCheckedChildren='РУС'
            onChange={() => toggleLanguage()}
          />
          {isAdmin ? <NavLink to={'/admin-panel'}
            className={`${styles.header__controlPanel__item}  ${styles.inter_semibold}`}
          >
            {username}
          </NavLink> : <p className={`${styles.header__controlPanel__item}  ${styles.inter_semibold}`}> {username}</p>}
          <button
            className={`${styles.header__controlPanel__item}  ${styles.inter__medium}`}
            onClick={() => logoutHandler()}
          >
            {texts[language].logout}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header
