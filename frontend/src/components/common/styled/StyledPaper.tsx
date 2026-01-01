import * as React from 'react'
import MuiPaper, { PaperProps } from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

const Styled = styled(MuiPaper)(
  ({ theme }) => ({
    '&.MuiPaper-root.MuiPaper-elevation': {
      'overflowX': 'scroll',
    },
  }),
)

const StyledPaper = (props: PaperProps) => {
  return (
    <Styled classes={props.classes}
            elevation={props.elevation}
            square={props.square}
            sx={props.sx}
            variant={props.variant}
            className={props.className}
            style={props.style}>{props.children}</Styled>
  )
}

export default StyledPaper
