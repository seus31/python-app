import * as React from 'react'
import {
    Container,
    Grid,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Button
} from '@mui/material'
import Layout from '../common/Layout'
import StyledPaper from '../common/styled/StyledPaper'
import { TaskType } from '../../types/TaskType'

interface TaskDetailProps {
    task: TaskType | null
}

const TaskDetail: React.FC<TaskDetailProps> = ({task}) => {
    return (
        <Layout>
            <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
                <StyledPaper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                    <Grid container spacing={2} p={2}>
                        <Grid item xs={12} p={2}>
                            <Typography variant="h4">タスク詳細</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={3}>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="ID" secondary={task?.id} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="タイトル" secondary={task?.task_name} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="ステータス" secondary={task?.status} />
                                    </ListItem>
                                </List>
                            </Paper>
                            <Button variant="contained" color="primary" href={`/tasks/${task?.id}/edit`} sx={{mt: 2, mr: 2}}>
                                編集
                            </Button>
                            <Button variant="contained" color="secondary" href="/tasks" sx={{mt: 2}}>
                                一覧に戻る
                            </Button>
                        </Grid>
                    </Grid>
                </StyledPaper>
            </Container>
        </Layout>
    )
}

export default TaskDetail
