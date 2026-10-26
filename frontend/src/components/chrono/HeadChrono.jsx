import { useState, useEffect, useRef } from "react";
import {Button, Paper, Box, Container, Typography, TextField, Stepper, Step, StepLabel} from "@mui/material";
import { departement, pattern, pattern2, dataChrono } from "../../data";
import { settingsZustand } from "../../zustand/settingsZustand.js";
import CelluleQuestion from "./CelluleQuestion.jsx";

const randomPattern = (mode) => {
    const liste = mode === 1 ? pattern2 : pattern
    return liste[Math.floor(Math.random() * liste.length)];
}

const HeadChrono = () =>
{
    const [result, setResult] = useState(0)
    const [countAsk, setCountAsk] = useState(0)
    const [partie, setPartie] = useState([])
    const [activeStep, setActiveStep] = useState(0);
    const [step, setStep] = useState(null)
    const [end, setEnd] = useState(false)
    const [start, setStart] = useState(false)
    const mode = settingsZustand((state) => state.mode)
    const carte = settingsZustand((state) => state.carte)
    const chronoTimer = useRef(null)
    const pageTimer = useRef(null)

    const clearTimers = () => {
        clearTimeout(chronoTimer.current)
        clearTimeout(pageTimer.current)
    }

    const randomData = (response, code, mode) => {
        const data = []
        while (data.length < 3) {
            const candidat = departement[Math.floor(Math.random() * departement.length)]
            if (candidat[code] === response)
                continue
            if (data.includes(candidat[code]))
                continue
            data.push(candidat[code])
        }
        return data
    }

    const randomPartie = () => {
        const data = []
        const codes = departement.slice(carte.start, carte.end + 1).map((d) => d[0])
        let tmp = dataChrono.filter((question) => codes.includes(question.index))
        while (data.length < 100 && tmp.length > 0) {
            const i = Math.floor(Math.random() * tmp.length)
            const question = tmp.splice(i, 1)[0]
            data.push(mode > 0 ? { ...question, other: randomData(question.response, question.code, mode), pattern: randomPattern(mode), answer: false } : question)
        }
        console.log(data)
        setPartie(data)
    }

    const changePage = () => {
        pageTimer.current = setTimeout(() => {
            setActiveStep((current) => current + 1);
        }, 750);
    };

    const startChrono = () => {
        clearTimeout(chronoTimer.current)
        setStart(true)
        setEnd(false)
        chronoTimer.current = setTimeout(() => {
            setStart(false)
            setEnd(true)
        }, 60000)
    }

    const startParti = () =>
    {
        clearTimers()
        setEnd(false)
        setStart(false)
        setActiveStep(0)
        setCountAsk(0)
        setResult(0)
        randomPartie(dataChrono)
    }

    useEffect(() =>
    {
        startParti()
        return clearTimers
    }, [])

    useEffect(() =>
    {
        if (partie.length > 0 && activeStep >= partie.length)
        {
            clearTimeout(chronoTimer.current)
            setStart(false)
            setEnd(true)
        }
        else
            setStep(partie[activeStep] ?? null)
    }, [partie, activeStep])

    if (!step) return null

    return (
        <Box>
            {!start && !end && (
                <>
                    <Button variant="contained" onClick={startChrono}>START</Button>
                </>
            )}
            {start && !end && (
            <>
                <Box >
                    <CelluleQuestion key={`${step.index}-${step.code}`} data={step} setCountAsk={setCountAsk} countAsk={countAsk} setResult={setResult} result={result} change={changePage}/>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button variant="contained" onClick={startParti}>
                        Rejouer
                    </Button>
                </Box>
            </>
            )}
            {end && !start && (
                <Paper>
                    <Typography>FINI</Typography>
                    <Typography>Score: {result} / {countAsk}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button variant="contained" onClick={startParti}>
                            Rejouer
                        </Button>
                    </Box>
                </Paper>
            )}
        </Box>
    )
}

export default HeadChrono
