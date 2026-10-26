import {Button, Paper, Box, Container, Typography, TextField, LinearProgress} from "@mui/material";

const CelluleChrono = ({chrono, result, countAsk}) =>
{
    return (
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
    )
}

export default CelluleChrono