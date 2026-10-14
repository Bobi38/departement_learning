import { useMemo } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Toaster } from 'sonner'
import HomePage from './pages/home/index.jsx'
import { colorZustand } from './zustand/colorZustand.js'
import theme from './style/theme.js'

export default function App() {
    const mode = colorZustand((state) => state.mode)
    const currentTheme = useMemo(() => theme(mode), [mode])

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <Toaster theme={mode} richColors />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}
