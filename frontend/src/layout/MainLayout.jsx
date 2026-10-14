import { Box } from '@mui/material'
import GlobalHeader from '../components/header/GlobalHeader.jsx'

export default function MainLayout({ children }) {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <GlobalHeader />
            <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
            </Box>
        </Box>
    )
}
