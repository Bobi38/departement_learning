import { useState, useEffect, useRef } from "react";
import {Button, Paper, Box, Container, Typography, TextField, LinearProgress, Slider} from "@mui/material";
import { departement } from "../../data/index.js";

const ListLearnParamHeader = ({setFetchParam, fetchParam}) =>
{
    const [listRegion, setlistRegion] = useState(false)
    const [value, setValue] = useState([1, departement.length])
    const [start, end] = value

    useEffect(() =>
    {
        setFetchParam({
            start: start,
            end: end,
            listCode: listCode,
            listRegion: listRegion
        })
    }, [start, end, listCode, listRegion])

    const handleChange = (event, newValue) =>
    {
        setValue(newValue)
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 5, py: 2 }}>
            <Slider value={value} onChange={handleChange} min={1} max={departement.length} valueLabelDisplay="auto" disableSwap />
            <Button onClick={() => setlistCode((prev) => !prev)}>Code</Button>
            <Button onClick={() => setlistRegion((prev) => !prev)}>Region</Button>
        </Box>
    )
}

export default ListLearnParamHeader