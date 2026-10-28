import { useState, useEffect, useRef, useMemo } from "react";
import {Button, Paper, Box, Container, Typography, TextField, LinearProgress} from "@mui/material";
import { departement, pattern, pattern2, dataChrono } from "../../data";
import { settingsZustand } from "../../zustand/settingsZustand.js";
import ListLearn from './ListLearn.jsx'
import ListLearnParamHeader from "./ListLearnParamHeader.jsx";


const HeadLearn = () =>
{
    const [modal, setModal] = useState('list')
    const [fetchParams, setFetchParams] = useState({});

    const data = useMemo(() =>
    {
        const { start = 1, end = departement.length, listRegion } = fetchParams
        console.log(start)
        // const test = departement.sort((a, b) => a[1].localeCompare(b[1]))
        // console.log(test)
        console.log(listRegion)
        const liste = [...departement]
        if (listRegion == true)
            liste.sort((a, b) => a[1].localeCompare(b[1]))
        return liste.slice(start - 1, end)
    }, [fetchParams])

    return (
        <Box>
            <Paper variant="outlined" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, pb: 2, my: 2 }}>
                <Button onClick={() => setModal('list')}>List</Button>
            </Paper>
            <Paper variant="outlined" sx={{ my: 2, overflow: 'hidden', py: 2}}>
                {modal == 'list' && (
                    <>
                        <ListLearnParamHeader setFetchParam={setFetchParams} fetchParam={fetchParams}/>
                        <ListLearn data={data}/>
                    </>
                )}
            </Paper>


        </Box>

    )
}

export default HeadLearn
