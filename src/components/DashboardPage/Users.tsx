import { useEffect, useState } from 'react'
import styles from './Users.module.css'
import { DeleteUser, GetAllUsers } from '../../api/UserService'
import { useAuth } from '../Other/authContext/useAuth'
import { IUsersProps, User } from '../../interfaces/Main'
import parsingInProcess from '../../assets/parsingInprocess.svg'
import parsingInProcessGrey from '../../assets/parsingInprocessGrey.svg'
import isAdmin from '../../assets/isAdmin.svg'
import isAdminGrey from '../../assets/isAdminGrey.svg'
import menu from '../../assets/menuIcon.svg'
import { dashboardTexts } from '../Other/LanguageProvider/languages'
import { useLanguage } from '../Other/LanguageProvider/useLanguage'

const Users: React.FC<IUsersProps> = ({ setEditingCardId }) => {
  const { token } = useAuth()
  const { language } = useLanguage()
  const [users, setUsers] = useState<User[] | undefined>(undefined)
  const [isVisible, setIsVisible] = useState<number | null>(null);
  const toggleControlItem = (index: number) => {
    setIsVisible(isVisible === index ? null : index);
  };
  // Первый useEffect для получения данных
  useEffect(() => {
    const fetchData = async () => {
      const data = await GetAllUsers(token)
      setUsers(data) // Устанавливаем данные в state
    }

    fetchData()
  }, [token]) // Зависимость от токена
  const userDeleteHandler = async (user_id: number) => {
    const updatedUserList: User[] | undefined = await DeleteUser(token, user_id)
    setUsers(updatedUserList)
  }
  return (
    <div className={styles.users}>
      {users &&
        users.map((user) => {
          return (
            <div>
              <div className={styles.users__userLine}>
                <div className={styles.userLine__userInfo}>
                  <p
                    className={`${styles.inter__medium} ${styles.userFirstName}`}
                  >
                    {user.fullname}
                  </p>
                  <p
                    className={`${styles.inter__medium} ${styles.userDescription}`}
                  >
                    {user.description}
                  </p>
                </div>
                <div className={styles.userLine__statusIcons}>
                  <img
                    src={
                      user.is_admin
                        ? isAdmin
                        : isAdminGrey
                    }
                    className={styles.userLine__statusIcon}
                    alt=''
                  />
                  <img
                    src={
                      user.is_parsing
                        ? parsingInProcess
                        : parsingInProcessGrey
                    }
                    className={styles.userLine__statusIcon}
                    alt=''
                  />
                  <img
                    src={menu}
                    className={styles.userLine__statusIconPointer}
                    onClick={() => toggleControlItem(user.id)}
                    alt=''
                  />
                  <div
                    className={`${styles.userLine__controlItem} ${isVisible === user.id ? styles.show : ''}`}
                  >
                    <div onClick={() => setEditingCardId && setEditingCardId(user.id)}
                      className={`${styles.userLine__controlItemEdit} ${styles.inter__trueMedium} ${styles.userFirstName}`}
                    >
                      {dashboardTexts[language].edit}
                    </div>
                    <div onClick={() => userDeleteHandler(user.id)}
                      className={`${styles.inter__trueMedium} ${styles.userFirstName}`} style={{ marginTop: '5px' }}
                    >
                      {dashboardTexts[language].remove}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default Users
