import { useState, useEffect } from "react";
import {Button, Paper, Box, Container, Typography, TextField, Stepper, Step, StepLabel} from "@mui/material";
import { departement, pattern } from "../../data";
import { settingsZustand } from "../../zustand/settingsZustand.js";
import CelluleCarte from "./CelluleCarte"
import CelluleRegion from "./CelulleRegion"
import CelluleDepartement from "./CelluleDepartement"
import CelluleChefLieu from "./CelulleChefLieu"
import CelluleResultat from "./CelulleResultat"

const steps = [
    {
        titre : 'Carte',
        header : CelluleCarte,
        pattern : [],
        other: [],
        answerBool : null,
        answer : null,
    },
    {
        titre : 'Région',
        header : CelluleRegion,
        pattern : [],
        other: [],
        answerBool : null,
        answer: null
    },
    {
        titre : 'Département',
        header : CelluleDepartement,
        pattern : [],
        other: [],
        answerBool : null,
        answer : null,
    },
    {
        titre : 'Chef-lieu',
        header : CelluleChefLieu,
        pattern : [],
        other: [],
        answerBool : null,
        answer : null,
    },
    {
        titre: 'Résultat',
        header: CelluleResultat,
        pattern : [],
        other: [],
        answer : null,
    }
];

const randomPattern = () => {
    return pattern[Math.floor(Math.random() * pattern.length)];
}

const randomData = (guess) => {
    const data = []
    while (data.length < 3) {
        const candidat = departement[Math.floor(Math.random() * departement.length)]
        if (candidat[3] === guess[3])
            continue
        if (data.some((d) => d[3] === candidat[3]))
            continue
        data.push(candidat)
    }
    return data
}

const HeadCarte = ({start, end}) =>
{
    const [guessDepartement, setGuessDepartement] = useState(null)
    const [partie, setPartie] = useState(steps)
    const [activeStep, setActiveStep] = useState(0);
    const carte = settingsZustand((state) => state.carte)

    const handleRandom = () => {
        const plage = departement.slice(carte.start, carte.end + 1)
        const guess = plage[Math.floor(Math.random() * plage.length)];
        setGuessDepartement(guess);
        setPartie(steps.map((step) => ({
            ...step,
            pattern : randomPattern(),
            other : randomData(guess),
        })))
        setActiveStep(0)
    }

    useEffect(() =>
    {
        handleRandom()
    }, [])

    if (!guessDepartement) return null

    function handleAnswer(estJuste, response){
        setPartie((current) => current.map((s, index) =>
            index === activeStep ? { ...s, answerBool : estJuste, answer: response } : s
        ))
    }

    const step = partie[activeStep]
    const ActiveCellule = step.header

    return (
        <Box>
            <Stepper activeStep={activeStep} sx={{ mb: 3 }} alternativeLabel>
                {partie.map((cel, index) => (
                    <Step key={index}>
                        <StepLabel>{cel.titre}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Paper sx={{p: 2}}>
                <Typography variant="h6"></Typography>
                <ActiveCellule guessDepartement={guessDepartement} guessPattern={step.pattern} guessData={step.other} onAnswer={handleAnswer} partie={partie} steps={steps} />
            </Paper>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                {activeStep < partie.length - 1 && step.answer != null ? (
                    <Button variant="contained" onClick={() => setActiveStep(activeStep + 1)}>
                        Suivant
                    </Button>
                ) : (
                    <Button variant="contained" onClick={handleRandom}>
                        Rejouer
                    </Button>
                )}
            </Box>
        </Box>
    )
}

export default HeadCarte
