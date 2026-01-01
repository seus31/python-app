import * as React from 'react'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import PeopleIcon from '@mui/icons-material/People'
import { NavLink } from 'react-router-dom'

export const MenuLists = (
  <React.Fragment>
    <ListItem component={NavLink} to="/dashboard" style={{textDecoration: 'none', color: 'unset'}}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="ダッシュボード" />
      </ListItemButton>
    </ListItem>
    <ListItem component={NavLink} to="/tasks" style={{textDecoration: 'none', color: 'unset'}}>
      <ListItemButton>
        <ListItemIcon>
          <MenuIcon />
        </ListItemIcon>
        <ListItemText primary="タスク一覧" />
      </ListItemButton>
    </ListItem>
  </React.Fragment>
)
