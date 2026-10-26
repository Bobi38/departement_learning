import { useState, useEffect, useRef } from "react";
import {Button, Paper, Box, Container, Typography, TextField, LinearProgress} from "@mui/material";
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
    const [chrono, setChrono] = useState(60)
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
    const chronoSecond = useRef(null)

    const clearTimers = () => {
        clearTimeout(chronoTimer.current)
        clearTimeout(pageTimer.current)
        clearInterval(chronoSecond.current)
        setChrono(60)
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
        clearInterval(chronoSecond.current)
        setStart(true)
        setEnd(false)
        chronoSecond.current = setInterval(() =>
        {
            setChrono(prev => {
                return prev-1
            })
        }, 1000)

        chronoTimer.current = setTimeout(() => {
            clearInterval(chronoSecond.current)
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
        setChrono(60)
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
            clearTimers()
            setStart(false)
            setEnd(true)
        }
        else
            setStep(partie[activeStep] ?? null)
    }, [partie, activeStep])

    if (!step) return null

    const urgent = chrono <= 10

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Paper sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box>
                        <Typography variant="caption" color="text.secondary">Temps</Typography>
                        <Typography variant="h4" color={urgent ? "error" : "text.primary"} sx={{ fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
                            {chrono}s
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" color="text.secondary">Score</Typography>
                        <Typography variant="h4" sx={{ lineHeight: 1 }}>{result} / {countAsk}</Typography>
                    </Box>
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={(chrono / 60) * 100}
                    color={urgent ? "error" : "primary"}
                    sx={{ height: 8, borderRadius: 4 }}
                />
            </Paper>

            {!start && !end && (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>Prêt ?</Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                        Réponds à un maximum de questions en 60 secondes.
                    </Typography>
                    <Button variant="contained" size="large" onClick={startChrono}>START</Button>
                </Paper>
            )}

            {start && !end && (
                <>
                    <CelluleQuestion key={`${step.index}-${step.code}`} data={step} setCountAsk={setCountAsk} countAsk={countAsk} setResult={setResult} result={result} change={changePage}/>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="outlined" onClick={startParti}>Rejouer</Button>
                    </Box>
                </>
            )}

            {end && !start && (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>Terminé !</Typography>
                    <Typography variant="h3" sx={{ mb: 1 }}>{result} / {countAsk}</Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                        {countAsk > 0 ? Math.round((result / countAsk) * 100) : 0}% de bonnes réponses
                    </Typography>
                    <Button variant="contained" size="large" onClick={startParti}>Rejouer</Button>
                </Paper>
            )}
        </Box>
    )
}

export default HeadChrono
