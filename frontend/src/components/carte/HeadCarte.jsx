import { useState, useEffect } from "react";
import {Button, Paper, Box, Container, Typography, TextField, Stepper, Step, StepLabel} from "@mui/material";
import { departement, pattern } from "../../data";
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
        answer : null,
    },
    {
        titre : 'Région',
        header : CelluleRegion,
        pattern : [],
        other: [],
        answer : null,
    },
    {
        titre : 'Département',
        header : CelluleDepartement,
        pattern : [],
        other: [],
        answer : null,
    },
    {
        titre : 'Chef-lieu',
        header : CelluleChefLieu,
        pattern : [],
        other: [],
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

const HeadCarte = () =>
{
    const [guessDepartement, setGuessDepartement] = useState(null)
    const [partie, setPartie] = useState(steps)
    const [activeStep, setActiveStep] = useState(0);

    const handleRandom = () => {
        const guess = departement[Math.floor(Math.random() * departement.length)];
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

    // Enregistre true / false pour l'étape en cours
    const handleAnswer = (estJuste) => {
        setPartie((current) => current.map((s, index) =>
            index === activeStep ? { ...s, answer : estJuste } : s
        ))
    }

    const step = partie[activeStep]
    const ActiveCellule = step.header

    return (
        <Box>
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
                {partie.map((cel, index) => (
                    <Step key={index}>
                        <StepLabel>{cel.titre}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <ActiveCellule guessDepartement={guessDepartement} guessPattern={step.pattern} guessData={step.other} onAnswer={handleAnswer} partie={partie} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                {activeStep < partie.length - 1 ? (
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
