import Mainlayout from '../../layout/MainLayout'
import { Container, Typography } from '@mui/material'

const RegionPage = () =>
{
    return (
        <Mainlayout>
            <Container maxWidth='xl' sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Par région
                </Typography>
            </Container>
        </Mainlayout>
    )
}

export default RegionPage
