import { useState, useEffect } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { normaliser } from "../../utils/normaliser";

const CelluleRegion = ({ guessDepartement, guessPattern, guessData, onAnswer, mode }) =>
{
    console.log(guessDepartement)
    const [reponse, setReponse] = useState(null)
    const [saisie, setSaisie] = useState("")

    useEffect(() =>
    {
        setReponse(null)
        setSaisie("")
    }, [guessDepartement])

    const choix = [guessDepartement, ...guessData]

    const handleResponse = (index) => {
        setReponse(index)
        onAnswer(choix[index][1] == guessDepartement[1], choix[index][1])
    }

    const handleSaisie = (event) => {
        event.preventDefault()
        if (!saisie.trim()) return
        onAnswer(normaliser(saisie) === normaliser(guessDepartement[1]), saisie)
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
            {mode > 0 ? (
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
            ):(
                <Box component="form" onSubmit={handleSaisie} sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        label="Réponse"
                        variant="outlined"
                        value={saisie}
                        onChange={(event) => setSaisie(event.target.value)}
                        fullWidth
                    />
                    <Button type="submit" variant="contained">Valider</Button>
                </Box>
            )}
        </Paper>
    )
}

export default CelluleRegion
