import { useState, useEffect, useRef, useMemo } from "react";
import {Button, Paper, Box, Container, Typography, TextField, LinearProgress} from "@mui/material";
import { departement, pattern, pattern2, dataChrono } from "../../data";
import { settingsZustand } from "../../zustand/settingsZustand.js";


const HeadChrono = () =>
{
    const [data, setData] = useState();
    const [fetchParams, setFetchParams] = useState({});

    useEffect(() =>
    {

    }, [fetchParams])

    return (

    )
}