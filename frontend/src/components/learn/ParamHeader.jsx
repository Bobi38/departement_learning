import { useState, useEffect, useRef } from "react";
import {Button, Paper, Box, Container, Typography, TextField, LinearProgress} from "@mui/material";
import { departement, pattern, pattern2, dataChrono } from "../../data";
import { settingsZustand } from "../../zustand/settingsZustand.js";
import CelluleQuestion from "./CelluleQuestion.jsx";
import CelluleChrono from "./CelluleChrono.jsx";

const randomPattern = (mode) => {
    const liste = mode === 1 ? pattern2 : pattern
    return liste[Math.floor(Math.random() * liste.length)];
}

const ParamHeader = ({setFetchParam, fetchParam}) =>
{
    const [listRegion, setlistRegion] = useState("")
    const [listCode, setlistCode] = useState("code")
    const carte = settingsZustand((state) => state.carte)

    useMemo = (() =>
    {
        setFetchParam({
            start: carte.start,
            end: carte.end,
            listCode: listCode,
            listRegion: listRegion
        })
    },[listCode, listRegion])

    return (
        <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, pb: 2 }}>
            <Button

        </Paper>
    )
}