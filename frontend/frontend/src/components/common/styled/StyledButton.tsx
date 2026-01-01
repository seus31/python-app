import * as React from 'react'
import MuiButton, { ButtonProps } from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const Styled = styled(MuiButton)(
  ({ theme }) => ({
    '&.MuiButtonBase-root.MuiButton-root': {
      margin: '0 5px',
    },
  }),
)

const StyledButton = (props: ButtonProps) => {
  return (
    <Styled
      variant={props.variant}
      size={props.size}
      classes={props.classes}
      color={props.color}
      disabled={props.disabled}
      disableElevation={props.disableElevation}
      disableFocusRipple={props.disableFocusRipple}
      endIcon={props.endIcon}
      fullWidth={props.fullWidth}
      href={props.href}
      startIcon={props.startIcon}
      sx={props.sx}
      onClick={props.onClick}
    >{props.children}</Styled>
  )
}

export default StyledButton
