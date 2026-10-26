import { useState, useEffect } from "react";
import {Button, Paper, Box, Container, Typography, TextField, Stepper, Step, StepLabel} from "@mui/material";
import { departement } from "../../data";


const questions =
[
    "Quel est le code de ce départment: ",
    "Dans quelle région est ce code: ",
    "Quel est le département de ce code: ",
    "Quel est le chef lieu de ce code: "
]

const CelluleQuestion = ({data, setCountAsk, countAsk, setResult, result, change}) =>
{
    const {code, response, question, pattern, other} = data
    const [clique, setClique] = useState(null)

    useEffect(() =>
    {
        setClique(null)
    }, [data])

    const choix = [ ...other, response]

    const handleResponse = (i) =>
    {
        if (clique !== null) return
        setClique(i)
        if (choix[i] == response)
            setResult(result + 1)
        setCountAsk(countAsk + 1)
        change()
    }

    const couleur = (i) =>
    {
        if (clique === null) return "primary"
        if (choix[i] === response) return "success"
        return i === clique ? "error" : "primary"
    }

    return (
        <Paper>
            <Typography>{questions[code]} {question}</Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 2,
                    }}
                >
                    {pattern.map((i) => (
                        <Button
                            key={i}
                            variant="contained"
                            color={couleur(i)}
                            onClick={() => {handleResponse(i)}}
                        >
                            {choix[i]}
                        </Button>
                    ))}
                </Box>
        </Paper>

    )
}

export default CelluleQuestion