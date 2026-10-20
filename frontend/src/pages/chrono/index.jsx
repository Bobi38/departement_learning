import Mainlayout from '../../layout/MainLayout'
import { Container, Typography } from '@mui/material'
import HeadChrono from '../../components/chrono/HeadChrono'

const ChronoPage = () =>
{
    return (
        <Mainlayout>
            <Container maxWidth='xl' sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Défi chronométré
                </Typography>
                <HeadChrono/>
            </Container>
        </Mainlayout>
    )
}

export default ChronoPage
