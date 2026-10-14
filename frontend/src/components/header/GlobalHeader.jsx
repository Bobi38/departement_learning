import { AppBar, IconButton, Toolbar, Box, Button, Paper, Typography } from '@mui/material'
import MapIcon from '@mui/icons-material/Map';
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { colorZustand } from '../../zustand/colorZustand.js'

export default function GlobalHeader() {
    const mode = colorZustand((state) => state.mode)
    const setMode = colorZustand((state) => state.setMode)

    return (
        <AppBar position="static">
            <Toolbar>
                <Paper variant="gradient">
					<MapIcon sx={{ fontSize: 40 }}/>
                </Paper>
				<Box sx={{mx:2}}>
					<Typography variant="h5">GeoFrance</Typography>
					<Typography variant="h6">Joue avec les départements</Typography>
				</Box>
                {/* <Box>
                    <IconButton
                        color="inherit"
                        sx={{ ml: 'auto' }}
                        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                        aria-label="Changer de thème"
                    >
                        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>
                </Box> */}
            </Toolbar>
        </AppBar>
    )
}
