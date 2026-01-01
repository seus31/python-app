import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useApi } from '../../providers/ApiContext'
import { useAuth } from '../../providers/AuthContext'
import { TaskType } from '../../types/TaskType'
import TaskDetail from '../presenters/TaskDetail'

const TaskDetailContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const apiUrl = useApi()
  const { token, logout } = useAuth()
  const [task, setTask] = useState<TaskType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchTask = async () => {
      const options = {
        method: 'GET',
        url: apiUrl + '/tasks/' + id,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }

      axios(options)
          .then((response: { data: {task: TaskType }}) => {
            setTask(response.data.task)
            setLoading(false)
          })
          .catch((error: unknown) => {
            console.log('fetch failed')
            setLoading(false)
          })
    }
    fetchTask().then(() => {})
  }, [])

  if (!token) {
    logout()
    return <Navigate to="/login" />
  }

  if (loading) return <p>Loading...</p>

  return <TaskDetail task={task} />
}

export default TaskDetailContainer
