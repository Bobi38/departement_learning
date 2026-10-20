import { useState, useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";

const CelluleChefLieu = ({ guessDepartement, guessPattern, guessData, onAnswer }) =>
{
    const [reponse, setReponse] = useState(null)

    useEffect(() =>
    {
        setReponse(null)
    }, [guessDepartement])

    // 0 = la bonne réponse, 1 à 3 = les mauvaises
    const choix = [guessDepartement, ...guessData]

    const handleResponse = (index) => {
        setReponse(index)
        onAnswer(choix[index][2] === guessDepartement[2], choix[index][2])
    }

    const couleur = (index) => {
        return index === reponse ? "success" : "primary"
    }

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Chef-lieu — code {guessDepartement[0]}</Typography>
            <Paper sx={{ p: 2, mb: 2 }}>
                <Typography>Trouve le chef-lieu associé au code : {guessDepartement[0]}</Typography>
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
                            {choix[index][2]}
                        </Button>
                    ))}
                </Box>
            )}
        </Paper>
    )
}

export default CelluleChefLieu
