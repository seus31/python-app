import * as React from 'react'
import MuiPagination, { PaginationProps } from '@mui/material/Pagination'
import { styled } from '@mui/material/styles'

const Styled = styled(MuiPagination)(
  ({ theme }) => ({
    '& .MuiPagination-ul': {
      'justifyContent': 'center',
      'alignItems': 'center'
    },
  }),
)

const StyledPagination = (props: PaginationProps) => {
  return (
    <Styled
      classes={props.classes}
      shape={props.shape}
      size={props.size}
      getItemAriaLabel={props.getItemAriaLabel}
      renderItem={props.renderItem}
      variant={props.variant}
      count={props.count}
      page={props.page}
      color={props.color}
      sx={props.sx}
      onChange={props.onChange} />
  )
}

export default StyledPagination
