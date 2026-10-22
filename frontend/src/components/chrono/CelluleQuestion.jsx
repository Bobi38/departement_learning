import { useState, useEffect } from "react";
import {Button, Paper, Box, Container, Typography, TextField, Stepper, Step, StepLabel} from "@mui/material";


const questions =
[
    "Quel est le code de ce départment: ",
    "Dans quelle région est ce code: ",
    "Quel est le département de ce code: ",
    "Quel est le chef lieu de ce code: "
]

const CelluleQuestion = ({data, questionAsk, result}) =>
{
    const {index, code, response, question, pattern, other} = data

    return (
        <Paper>
            <Typography>{question[code]} {response}</Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 2,
                    }}
                >
                    {pattern.map((index) => (
                        <Button
                            key={index}
                            variant="contained"
                            color={couleur(index)}
                            onClick={() => {handleResponse(index)}}
                        >
                            {other[index][code]}
                        </Button>
                    ))}
                </Box>
        </Paper>

    )
}