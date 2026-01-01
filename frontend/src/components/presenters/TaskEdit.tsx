import * as React from 'react'
import {
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent
} from '@mui/material'
import Layout from '../common/Layout'
import StyledPaper from '../common/styled/StyledPaper'
import { TaskType } from '../../types/TaskType'

interface TaskEditProps {
    task: TaskType | null
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleStatusChange: (event: SelectChangeEvent<string>) => void
}

const TaskEdit: React.FC<TaskEditProps> = ({task, handleSubmit, handleInputChange, handleStatusChange}) => {
    return (
        <Layout>
            <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
                <StyledPaper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                    <Grid container spacing={2} p={2}>
                        <Grid item xs={12} p={2}>
                            <Typography variant="h4">タスク編集</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    label="タイトル"
                                    name="task_name"
                                    value={task?.task_name}
                                    onChange={handleInputChange}
                                    margin="normal"
                                />
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>ステータス</InputLabel>
                                    <Select
                                        value={task?.status}
                                        onChange={(event) => handleStatusChange(event)}
                                        label="ステータス"
                                    >
                                        <MenuItem value="0">未着手</MenuItem>
                                        <MenuItem value="1">進行中</MenuItem>
                                        <MenuItem value="2">完了</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button type="submit" variant="contained" color="primary" sx={{mt: 2}}>
                                    更新
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </StyledPaper>
            </Container>
        </Layout>
    )
}

export default TaskEdit
