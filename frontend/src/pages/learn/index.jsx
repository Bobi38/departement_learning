import Mainlayout from '../../layout/MainLayout'
import { Container, Typography } from '@mui/material'
import HeadLearn from '../../components/learn/HeadLearn'

const LearnPage = () =>
{
    return (
        <Mainlayout>
            <Container maxWidth='xl' sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Viens réviser
                </Typography>
                <HeadLearn/>
            </Container>
        </Mainlayout>
    )
}

export default LearnPage
