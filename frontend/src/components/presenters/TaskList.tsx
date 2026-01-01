import * as React from 'react'
import {
    Container,
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper
} from '@mui/material'
import Layout from '../common/Layout'
import StyledPaper from '../common/styled/StyledPaper'
import { TaskType } from '../../types/TaskType'
import Button from "@mui/material/Button";

interface TaskListProps {
  tasks: TaskType[]
  page: number
  rowsPerPage: number
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TaskList: React.FC<TaskListProps> = ({tasks, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage}) => {
    return (
        <Layout>
            <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
                <StyledPaper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                    <Grid container spacing={2} p={2}>
                        <Grid item xs={12} p={2}>
                            <Typography variant="h4">タスク一覧</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 650}} aria-label="task table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>タイトル</TableCell>
                                            <TableCell>ステータス</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
                                            <TableRow key={task.id}>
                                                <TableCell>{task.id}</TableCell>
                                                <TableCell>{task.task_name}</TableCell>
                                                <TableCell>{task.status}</TableCell>
                                                <TableCell>
                                                    <Button className="mx-2" variant="contained" color="primary" href={`/tasks/${task.id}/detail`}>詳細</Button>
                                                    <Button className="mx-2" variant="contained" color="warning" href={`/tasks/${task.id}/edit`}>編集</Button>
                                                    <Button className="mx-2" variant="contained" color="error">削除</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={tasks.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Grid>
                    </Grid>
                </StyledPaper>
            </Container>
        </Layout>
    )
}

export default TaskList
