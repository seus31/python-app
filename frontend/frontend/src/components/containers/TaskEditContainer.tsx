import React, { useEffect, useState } from 'react'
import {useParams, useNavigate, Navigate} from 'react-router-dom'
import { TaskType } from '../../types/TaskType'
import TaskEdit from '../presenters/TaskEdit'
import {useApi} from "../../providers/ApiContext";
import {useAuth} from "../../providers/AuthContext";
import axios from "axios";
import {SelectChangeEvent} from "@mui/material";

const TaskEditContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const apiUrl = useApi()
  const { token, logout } = useAuth()
  const navigate = useNavigate()
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
  }, [id])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!task) return
    const { name, value } = event.target
    setTask({ ...task, [name]: value })
  }

  // ステータス変更時の処理
  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    if (!task) return
    setTask({ ...task, status: event.target.value as string })
  }

  // フォーム送信時の処理
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const options = {
        method: 'PUT',
        url: apiUrl + '/tasks/' + id,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(task),
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
      alert('タスクが更新されました')
      navigate('/tasks')
    } catch (error) {
      console.error('Error updating task:', error)
      alert('タスクの更新に失敗しました')
    }
  }

  if (!token) {
    logout()
    return <Navigate to="/login" />
  }

  if (loading) return <p>Loading...</p>

  return (
      <TaskEdit
          task={task}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleStatusChange={handleStatusChange}
      />
  )
}

export default TaskEditContainer
