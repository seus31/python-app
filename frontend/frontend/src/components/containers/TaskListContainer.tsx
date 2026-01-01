import axios, {AxiosError} from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useApi } from '../../providers/ApiContext'
import { useAuth } from '../../providers/AuthContext'
import { TaskType } from '../../types/TaskType'
import TaskList from '../presenters/TaskList'

const TaskListContainer = () => {
  const apiUrl = useApi()
  const apiEndpoint = apiUrl + '/tasks'
  const { token, logout } = useAuth()
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    const fetchTasks = async () => {
      const param = { page: page, per_page: rowsPerPage }
      const options = {
        method: 'GET',
        url: apiEndpoint,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: param,
      }

      axios(options)
          .then((response: { data: {tasks: TaskType[] }}) => {
            setTasks(response.data.tasks)
          })
          .catch((error: unknown) => {
            if (axios.isAxiosError(error)) {
              if (error.response?.data?.msg == 'Token has expired') {
                console.log('An error occurred: Token has expired')
                logout()
              }
            } else {
              console.log('An unexpected error occurred')
            }
            console.log('fetch failed')
          })
    }
    fetchTasks().then(() => {})
  }, [])

  if (!token) {
    logout()
    return <Navigate to="/login" />
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TaskList
        tasks={tasks}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  )
}

export default TaskListContainer
