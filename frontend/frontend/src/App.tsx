import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ApiProvider } from './providers/ApiContext'
import { AuthProvider } from './providers/AuthContext'
import DashboardContainer from './components/containers/DashboardContainer'
import LoginContainer from './components/containers/LoginContainer'
import RegisterContainer from './components/containers/RegisterContainer'
import TaskDetailContainer from './components/containers/TaskDetailContainer'
import TaskEditContainer from './components/containers/TaskEditContainer'
import TaskListContainer from './components/containers/TaskListContainer'

const mdTheme = createTheme({
  palette: {
    //primary: { main: '#0bbe78' }
  }
})

const apiUrl = 'http://localhost:8555/api/v1'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={mdTheme}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthProvider>
            <ApiProvider apiUrl={apiUrl}>
              <Routes>
                <Route path="/login" Component={LoginContainer} />
                <Route path="/register" Component={RegisterContainer} />
                <Route path="/dashboard" Component={DashboardContainer} />
                <Route path="/tasks" Component={TaskListContainer} />
                <Route path="/tasks/:id/detail" Component={TaskDetailContainer} />
                <Route path="/tasks/:id/edit" Component={TaskEditContainer} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </ApiProvider>
          </AuthProvider>
        </LocalizationProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
