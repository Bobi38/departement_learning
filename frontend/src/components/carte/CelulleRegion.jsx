import { useState, useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";

const CelluleRegion = ({ guessDepartement, guessPattern, guessData }) =>
{
    const [reponse, setReponse] = useState(null)

    useEffect(() =>
    {
        setReponse(null)
    }, [guessDepartement])

    const choix = [guessDepartement, ...guessData]

    const couleur = (index) => {
        if (reponse === null) return "primary"
        if (index === 0) return "success"
        if (index === reponse) return "error"
        return "inherit"
    }

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Région</Typography>
            <Paper sx={{ p: 2, mb: 2 }}>
                <Typography>Trouve la région associée au code : {guessDepartement[0]}</Typography>
            </Paper>
            {guessData.length === 3 && guessPattern.length === 4 && (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 2,
                    }}
                >
                    {guessPattern.map((index) => (
                        <Button
                            key={index}
                            variant="contained"
                            color={couleur(index)}
                            onClick={() => reponse === null && setReponse(index)}
                        >
                            {choix[index][3]}
                        </Button>
                    ))}
                </Box>
            )}
            {reponse !== null && (
                <Typography sx={{ mt: 2 }}>
                    {reponse === 0 ? "Bonne réponse !" : `Raté, c'était ${guessDepartement[3]}.`}
                </Typography>
            )}
        </Paper>
    )
}

export default CelluleRegion
