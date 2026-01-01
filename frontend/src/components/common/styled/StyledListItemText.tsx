import * as React from 'react'
import MuiListItemText, { ListItemTextProps } from '@mui/material/ListItemText'
import { styled } from '@mui/material/styles'

const Styled = styled(MuiListItemText)(
  ({ theme }) => ({
    '&.MuiListItemText-root.MuiListItemText-multiline .MuiTypography-root.MuiTypography-body2': {
      'color': '#00f',
    },
  }),
)

const StyledListItemText = (props: ListItemTextProps) => {
  return (
    <Styled
      classes={props.classes}
      disableTypography={props.disableTypography}
      inset={props.inset}
      primary={props.primary}
      primaryTypographyProps={props.primaryTypographyProps}
      secondary={props.secondary}
      secondaryTypographyProps={props.secondaryTypographyProps}
      sx={props.sx}>{props.children}</Styled>
  )
}

export default StyledListItemText
