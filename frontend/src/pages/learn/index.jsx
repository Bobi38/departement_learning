import Mainlayout from '../../layout/MainLayout'
import { Container, Typography } from '@mui/material'
import {HeadCarte} from '../../components/carte/'

const CartePage = () =>
{
    return (
        <Mainlayout>
            <Container maxWidth='xl' sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Viens réviser
                </Typography>
                <HeadCarte/>
            </Container>
        </Mainlayout>
    )
}

export default CartePage
