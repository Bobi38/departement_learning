import { useState, useEffect } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { normaliser } from "../../utils/normaliser";

const CelluleChefLieu = ({ guessDepartement, guessPattern, guessData, onAnswer, mode }) =>
{
    const [reponse, setReponse] = useState(null)
    const [saisie, setSaisie] = useState("")

    useEffect(() =>
    {
        setReponse(null)
        setSaisie("")
    }, [guessDepartement])

    // 0 = la bonne réponse, 1 à 3 = les mauvaises
    const choix = [guessDepartement, ...guessData]

    const handleResponse = (index) => {
        setReponse(index)
        onAnswer(choix[index][3] === guessDepartement[3], choix[index][3])
    }

    const handleSaisie = (event) => {
        event.preventDefault()
        if (!saisie.trim()) return
        onAnswer(normaliser(saisie) === normaliser(guessDepartement[3]), saisie)
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
                            {choix[index][3]}
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
        </Paper>
    )
}

export default CelluleChefLieu
