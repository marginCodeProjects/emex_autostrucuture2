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
import { message } from 'antd'

const Users: React.FC<IUsersProps> = ({ setEditingCardId, users, setUsers }) => {
  const { token } = useAuth()
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState<number | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const toggleControlItem = (index: number) => {
    setIsVisible(isVisible === index ? null : index);
  };
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Пользователь успешно удалён',
    });
  };
  const error = (content: string) => {
    messageApi.open({
      type: 'error',
      content: content,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await GetAllUsers(token)
      setUsers && setUsers(data)
    }

    fetchData()
  }, [token]) // Зависимость от токена
  const userDeleteHandler = async (user_id: number) => {
    const updatedUserList: User[] | undefined = await DeleteUser(token, user_id)
    setUsers && setUsers(updatedUserList)
    if (typeof updatedUserList === 'object') {
      success()
    }
    else { error("Произошла ошибка") }
  }
  return (
    <div className={styles.users}>
      {contextHolder}

      <div className={styles.usersDiv}>
        {users &&
          users.map((user) => {
            return (
              <div key={user.id}>
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
                        className={`${styles.userLine__controlItemEdit} ${styles.inter__trueMedium} ${styles.userActionsTexts}`}
                      >
                        {dashboardTexts[language].edit}
                      </div>
                      <div onClick={() => userDeleteHandler(user.id)}
                        className={`${styles.inter__trueMedium} ${styles.userActionsTexts} ${styles.userLine__controlItemRemove}`}
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
      <div className={`${styles.users__addUserButton} ${styles.inter__trueMedium}  ${styles.userActionsTexts} `} onClick={() => setEditingCardId && setEditingCardId(true)}>{dashboardTexts[language].add}</div>
    </div>
  )
}

export default Users
