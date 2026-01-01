import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

interface RegisterFormProps {
  handleRegister?: (e: { preventDefault: () => void }) => Promise<void>,
  handleUserNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleEmailChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handlePasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handlePasswordConfirmChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function RegisterForm(props: RegisterFormProps) {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={props.handleRegister} noValidate sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="user_name"
            label="Username"
            name="text"
            autoFocus
            onChange={props.handleUserNameChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={props.handleEmailChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={props.handlePasswordChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password_confirm"
            label="Password Confirm"
            type="password"
            id="password_confirm"
            autoComplete="current-password"
            onChange={props.handlePasswordConfirmChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Register
          </Button>
          <Link component={RouterLink} to="/login" underline="none" color="primary">
            Go to login
          </Link>
        </Box>
      </Box>
    </Container>
  )
}
