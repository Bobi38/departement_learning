import { useState, useEffect } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { normaliser } from "../../utils/normaliser";

const CelluleDepartement = ({ guessDepartement, guessPattern, guessData, onAnswer, mode }) =>
{
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
        onAnswer(choix[index][2] === guessDepartement[2], choix[index][2])
    }

    const handleSaisie = (event) => {
        event.preventDefault()
        if (!saisie.trim()) return
        onAnswer(normaliser(saisie) === normaliser(guessDepartement[2]), saisie)
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
                            {choix[index][2]}
                        </Button>
                    ))}
                </Box>
            ) : (
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
        </Box>
    )
}

export default CelluleDepartement
