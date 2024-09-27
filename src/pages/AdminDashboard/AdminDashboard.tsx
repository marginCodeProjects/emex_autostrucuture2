import { useState } from 'react'
import Users from '../../components/DashboardPage/Users'
import styles from './AdminDashboard.module.css'
import UsersFields from '../../components/DashboardPage/UsersFields'
import { User } from '../../interfaces/Main'
const AdminDashboard = () => {
  const [editingCardId, setEditingCardId] = useState<number | null | true>(
    null
  )
  const [users, setUsers] = useState<User[] | undefined>(undefined)

  return (
    <div className={styles.dashboard__container}>
      <Users users={users} setUsers={setUsers} setEditingCardId={setEditingCardId}  />
      <UsersFields users={users} setUsers={setUsers} editingCardId={editingCardId} setEditingCardId={setEditingCardId} />
    </div>
  )
}

export default AdminDashboard
