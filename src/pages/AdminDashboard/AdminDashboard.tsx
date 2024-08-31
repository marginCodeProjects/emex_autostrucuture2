import { useState } from 'react'
import Users from '../../components/DashboardPage/Users'
import styles from './AdminDashboard.module.css'
const AdminDashboard = () => {
  const [editingCardId, setEditingCardId] = useState<number | null>(null)
  return (
    <div className={styles.dashboard__container}><Users setEditingCardId={setEditingCardId} /></div>
  )
}

export default AdminDashboard