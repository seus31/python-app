import * as React from 'react'
import MuiTableCell, { TableCellProps } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'

const Styled = styled(MuiTableCell)(
  ({ theme }) => ({
    '&.MuiTableCell-root.MuiTableCell-head': {
      'minWidth': '350px !important',
    },
    '&.MuiTableCell-root.MuiTableCell-head button': {
      'margin': '0 5px',
    },
  }),
)

const StyledTableCell = (props: TableCellProps) => {
  return (
    <Styled
      align={props.align}
      classes={props.classes}
      component={props.component}
      padding={props.padding}
      scope={props.scope}
      size={props.size}
      sortDirection={props.sortDirection}
      sx={props.sx}
      variant={props.variant}>{props.children}</Styled>
  )
}

export default StyledTableCell
