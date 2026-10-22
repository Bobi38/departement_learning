import { useState, useEffect } from "react";
import {Button, Paper, Box, Container, Typography, TextField, Stepper, Step, StepLabel} from "@mui/material";
import { departement, pattern, pattern2 } from "../../data";
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

// mode = nombre de mauvaises réponses proposées (0 = saisie libre)
const randomPattern = (mode) => {
    const liste = mode === 1 ? pattern2 : pattern
    return liste[Math.floor(Math.random() * liste.length)];
}

const randomData = (guess, mode) => {
    const data = []
    while (data.length < mode) {
        const candidat = departement[Math.floor(Math.random() * departement.length)]
        if (candidat[1] === guess[1])
            continue
        if (data.some((d) => d[1] === candidat[1]))
            continue
        data.push(candidat)
    }
    return data
}

const HeadCarte = () =>
{
    const [guessDepartement, setGuessDepartement] = useState(null)
    const [partie, setPartie] = useState(steps)
    const [activeStep, setActiveStep] = useState(0);
    const carte = settingsZustand((state) => state.carte)
    const mode = settingsZustand((state) => state.mode)

    const handleRandom = () => {
        const plage = departement.slice(carte.start, carte.end + 1)
        const guess = plage[Math.floor(Math.random() * plage.length)];
        setGuessDepartement(guess);
        setPartie(steps.map((step) => ({
            ...step,
            pattern : mode > 0 ? randomPattern(mode) : [],
            other : randomData(guess, mode),
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
                <ActiveCellule guessDepartement={guessDepartement} guessPattern={step.pattern} guessData={step.other} onAnswer={handleAnswer} mode={mode} partie={partie} steps={steps} />
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
