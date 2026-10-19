import Mainlayout from '../../layout/MainLayout'
import { Container, Typography } from '@mui/material'

const ChronoPage = () =>
{
    return (
        <Mainlayout>
            <Container maxWidth='xl' sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Défi chronométré
                </Typography>
            </Container>
        </Mainlayout>
    )
}

export default ChronoPage
