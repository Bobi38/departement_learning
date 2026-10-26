import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider, Typography } from '@mui/material'
import { departement } from '../../data'
import { settingsZustand } from '../../zustand/settingsZustand.js'

// 10 départements minimum : écart de 9 entre les deux poignées
const MIN_DISTANCE = 9
const LAST = departement.length - 1

export default function SettingsDialog({ open, onClose }) {
    const carte = settingsZustand((state) => state.carte)
    const setCarte = settingsZustand((state) => state.setCarte)
    const mode = settingsZustand((state) => state.mode)
    const setMode = settingsZustand((state) => state.setMode)

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) return
        if (activeThumb === 0) {
            setCarte({ start: Math.max(0, Math.min(newValue[0], carte.end - MIN_DISTANCE)), end: carte.end })
        } else {
            setCarte({ start: carte.start, end: Math.min(LAST, Math.max(newValue[1], carte.start + MIN_DISTANCE)) })
        }
    }

    const debut = departement[carte.start]
    const fin = departement[carte.end]
    const corses = departement
        .slice(carte.start, carte.end + 1)
        .map((d) => d[0])
        .filter((code) => code === '2A' || code === '2B')

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Paramètres</DialogTitle>
            <DialogContent>
                <Typography variant="h6" sx={{ mb: 1 }}>Jeu de la carte</Typography>
                <Typography>
                    Du {debut[0]} ({debut[2]}) au {fin[0]} ({fin[2]}) : {carte.end - carte.start + 1} départements
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    {corses.length > 0
                        ? `Inclut ${corses.join(' et ')} (placés entre le 19 et le 21, il n'y a pas de 20).`
                        : ' '}
                </Typography>
                <Box sx={{ px: 2 }}>
                    <Slider
                        value={[carte.start, carte.end]}
                        min={0}
                        max={LAST}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        valueLabelFormat={(index) => departement[index][0]}
                        disableSwap
                    />
                </Box>
            </DialogContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, pb: 2 }}>
                <Typography>Avec aide</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined" color={mode === 0 ? "success" : "primary"} onClick={() => setMode(0)}>Non</Button>
                    <Button variant="outlined" color={mode === 3 ? "success" : "primary"} onClick={() => setMode(3)}>Oui</Button>
                </Box>
            </Box>
            <DialogActions>
                <Button onClick={() => setCarte({ start: 0, end: LAST })}>Tous</Button>
                <Button onClick={onClose}>Fermer</Button>
            </DialogActions>
        </Dialog>
    )
}
