import Mainlayout from '../../layout/MainLayout'
import { Box, Container, Typography } from '@mui/material'
import CelluleGameHome from '../../components/home/CelluleGameHome'
import { data } from "../../data/game"

const HomePage = () =>
{
    return (
        <Mainlayout>
            <Container maxWidth='xl' sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Choisissez un jeu
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                        gap: 3,
                    }}
                >
                    {data.map((cel, index) => (
                        <CelluleGameHome key={index} url={cel.url} titre={cel.titre} description={cel.description}/>
                    ))}
                </Box>
            </Container>
        </Mainlayout>
    )
}

export default HomePage
