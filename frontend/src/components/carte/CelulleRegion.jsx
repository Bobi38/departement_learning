import { useState, useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";

const CelluleRegion = ({ guessDepartement, guessPattern, guessData, onAnswer }) =>
{
    console.log(guessDepartement)
    const [reponse, setReponse] = useState(null)

    useEffect(() =>
    {
        setReponse(null)
    }, [guessDepartement])

    const choix = [guessDepartement, ...guessData]

    const handleResponse = (index) => {
        console.log(choix[index][3], guessDepartement[3])
        setReponse(index)
        onAnswer(choix[index][3] == guessDepartement[3], choix[index][3])
    }

    const couleur = (index) => {
        return index === reponse ? "success" : "primary"
    }

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Région — code {guessDepartement[0]}</Typography>
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
                            onClick={() => {handleResponse(index)}}
                        >
                            {choix[index][3]}
                        </Button>
                    ))}
                </Box>
            )}
        </Paper>
    )
}

export default CelluleRegion
