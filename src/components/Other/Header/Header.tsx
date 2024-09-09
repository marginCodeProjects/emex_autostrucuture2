import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import { message, Switch } from 'antd'
import { useLanguage } from '../../Other/LanguageProvider/useLanguage';
import { texts } from '../../Other/LanguageProvider/languages';
import { useEffect, useState } from 'react';
import { handleLogout } from '../../../api/UserService';
import { IHeaderProps } from '../../../interfaces/Main';

import logo from '../../../assets/logo.svg';
import { useAuth } from '../../Other/authContext/useAuth';
const Header: React.FC<IHeaderProps> = ({ onLogoutSuccess, username }) => {
  const { language, toggleLanguage } = useLanguage();
  const { token, isAdmin } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  function logoutHandler() {
    handleLogout(setErrorMessage, token, onLogoutSuccess, language)
  }
  const error = (message: string) => {
    messageApi.open({
      type: 'error',
      content: message
    });
  };
  useEffect(() => {
    if (errorMessage) {
      error(errorMessage)
    }
  }, [errorMessage])

  return (
    <nav className={styles.header}>
      {contextHolder}
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
              to='/history'
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
              to='/settings'
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
          {isAdmin ? <NavLink to={'/dashboard'} className={`${styles.header__controlPanel__item}  ${styles.inter_semibold}`} >{username}</NavLink> : <p
            className={`${styles.header__controlPanel__item}  ${styles.inter_semibold}`}
          >
            {username}
          </p>}
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
