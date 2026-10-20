import { useState, useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";

const CelluleDepartement = ({ guessDepartement, guessPattern, guessData, onAnswer }) =>
{
    const [reponse, setReponse] = useState(null)

    useEffect(() =>
    {
        setReponse(null)
    }, [guessDepartement])

    const choix = [guessDepartement, ...guessData]

    const handleResponse = (index) => {
        setReponse(index)
        onAnswer(choix[index][1] === guessDepartement[1], choix[index][1])
    }

    const couleur = (index) => {
        return index === reponse ? "success" : "primary"
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6">Département — code {guessDepartement[0]}</Typography>
            <Paper sx={{ p: 2, mb: 2 }}>
                <Typography>Trouve le département associé au code : {guessDepartement[0]}</Typography>
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
                            onClick={() => {handleResponse(index)}}
                        >
                            {choix[index][1]}
                        </Button>
                    ))}
                </Box>
            )}
        </Box>
    )
}

export default CelluleDepartement
